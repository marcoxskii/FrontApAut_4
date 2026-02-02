import { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, RefreshCw, X, AlertCircle, Power, PowerOff, Volume2 } from 'lucide-react';

// This is a mockup of what the backend would return after YOLO processing
const MOCK_DB = {
  "lenovo_thinkpad": { sku: "LNV-TP-T480", name: "Lenovo ThinkPad T480", price: 350.00, stock: 5, id: 101 },
  "dell_latitude": { sku: "DLL-LT-7490", name: "Dell Latitude 7490", price: 320.00, stock: 3, id: 102 },
  "hp_elitebook": { sku: "HP-EB-840", name: "HP EliteBook 840 G5", price: 340.00, stock: 8, id: 103 },
};

export default function ScanLaptop() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Fix for iOS black screen: ensure video plays
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.error("Play error:", e));
        };
      }
      setError(null);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("No se pudo acceder a la cámara. Por favor verifica los permisos.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    setIsCameraActive(false);
  };

  const toggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
      setImageCaptured(imageDataUrl);
      analyzeImage(imageDataUrl);
    }
  };

  const analyzeImage = async (imageData) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      // 1. Convert Data URL (base64) to Blob
      const fetchResponse = await fetch(imageData);
      const blob = await fetchResponse.blob();

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append('file', blob, 'capture.jpg');

      // 3. Send to Backend API
      const apiResponse = await fetch('http://localhost:9000/api/detect', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.statusText}`);
      }

      const data = await apiResponse.json();
      
      // 4. Transform Backend response
      const salesPitch = data.metadata?.sales_pitch || "Producto identificado exitosamente.";
      
      setResult({
        name: data.prediction,
        sku: data.metadata?.sku_match || `DETECTED-${data.class_id || 0}`,
        price: 0, 
        stock: 0,
        confidence: data.confidence,
        description: salesPitch
      });

      // 5. Generate and Play Audio via ElevenLabs
      await playSalesPitch(salesPitch);

    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Error al conectar con el servidor de análisis. Asegúrate que el backend esté corriendo en el puerto 9000.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playSalesPitch = async (text) => {
    try {
      // API Key de ElevenLabs (HARDCODED FOR DEMO)
      const API_KEY = "sk_1456bcb14961f6f8ca7605a1c6f8c3f0f7a626354b3730c2";
      const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel Voice
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": API_KEY
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (!response.ok) throw new Error("Error generating audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlayingAudio(true);
        audioRef.current.onended = () => setIsPlayingAudio(false);
      }
    } catch (e) {
      console.error("Audio generation failed:", e);
    }
  };

  const resetScan = () => {
    setImageCaptured(null);
    setResult(null);
    setIsAnalyzing(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center flex-grow">Identificador IA</h1>
        <button 
          onClick={toggleCamera}
          className={`p-2 rounded-full transition-colors ${isCameraActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
          title={isCameraActive ? "Apagar Cámara" : "Encender Cámara"}
        >
          {isCameraActive ? <PowerOff size={24} /> : <Power size={24} />}
        </button>
      </div>

      <div className="w-full max-w-md bg-slate-800 rounded-xl overflow-hidden shadow-2xl border border-slate-700 relative">
        
        {/* Camera View / Image Preview */}
        <div className="relative aspect-[3/4] bg-black">
          {!isCameraActive && !imageCaptured ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-gray-400">
               <PowerOff className="h-16 w-16 mb-4 opacity-50" />
               <p>Cámara desactivada</p>
               <button onClick={startCamera} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                 Activar Cámara
               </button>
            </div>
          ) : error ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
                <p>{error}</p>
                <button onClick={startCamera} className="mt-4 px-4 py-2 bg-blue-600 rounded-lg">Reintentar</button>
             </div>
          ) : imageCaptured ? (
            <img src={imageCaptured} alt="Captured" className="w-full h-full object-cover" />
          ) : (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted 
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay scanning effect */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-blue-500/20 z-10">
               <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_#60a5fa] animate-scan"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/70 px-4 py-2 rounded-full flex items-center space-x-2">
                    <RefreshCw className="animate-spin h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">Analizando imagen...</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6">
          {!imageCaptured ? (
            <button 
              onClick={captureImage}
              disabled={!isCameraActive}
              className={`w-full py-4 rounded-full font-bold text-lg shadow-lg flex items-center justify-center transition-all ${
                isCameraActive 
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Camera className="mr-2 h-6 w-6" /> Capturar Laptop
            </button>
          ) : (
             !isAnalyzing && (
               <button 
                 onClick={resetScan}
                 className="w-full py-3 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium flex items-center justify-center"
               >
                 <RefreshCw className="mr-2 h-5 w-5" /> Escanear otra vez
               </button>
             )
          )}
        </div>

        {/* Results Panel */}
        {result && (
          <div className="animate-slide-up bg-white text-slate-900 p-6 rounded-t-2xl absolute bottom-0 left-0 right-0 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
             <div className="flex items-start justify-between mb-4">
               <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" /> Identificación Exitosa
                  </p>
                  <h2 className="text-2xl font-bold">{result.name}</h2>
               </div>
               <div className="bg-slate-100 p-2 rounded text-right">
                  <p className="text-xs text-slate-500">ID Producto</p>
                  <p className="font-mono font-bold text-slate-700">#{result.id}</p>
               </div>
             </div>

             <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium">{result.sku}</span>
                </div>
                
                {/* Sales Pitch with Audio Indicator */}
                {result.description && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2 relative overflow-hidden">
                     <p className="text-sm text-slate-700 italic">"{result.description}"</p>
                     {isPlayingAudio && (
                        <div className="absolute top-2 right-2">
                           <Volume2 className="h-4 w-4 text-blue-500 animate-pulse" />
                        </div>
                     )}
                  </div>
                )}

                <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Existencias</span>
                    <span className="font-medium">{result.stock} unidades</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500">Precio Estimado</span>
                    <span className="text-2xl font-bold text-blue-600">${result.price.toFixed(2)}</span>
                </div>
             </div>

             <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700">
                Ver Detalles y Comprar
             </button>
             <audio ref={audioRef} className="hidden" />
          </div>
        )}
      </div>
      
      {/* Hidden Canvas for capture */}
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes slide-up {
           from { transform: translateY(100%); }
           to { transform: translateY(0); }
        }
        .animate-slide-up {
           animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
