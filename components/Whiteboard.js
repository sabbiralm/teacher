'use client'
import { useRef, useEffect, useState } from 'react'

export default function Whiteboard({ isOpen, onClose }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    
    // Set initial background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">ইন্টারঅ্যাক্টিভ হোয়াইটবোর্ড</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="flex-grow flex">
          {/* Tools Sidebar */}
          <div className="w-16 bg-gray-100 p-4 space-y-4">
            <div className="space-y-2">
              <button 
                onClick={() => setColor('#000000')}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === '#000000' ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#000000' }}
              ></button>
              <button 
                onClick={() => setColor('#ff0000')}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === '#ff0000' ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#ff0000' }}
              ></button>
              <button 
                onClick={() => setColor('#0000ff')}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === '#0000ff' ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#0000ff' }}
              ></button>
              <button 
                onClick={() => setColor('#008000')}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === '#008000' ? 'border-blue-500' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#008000' }}
              ></button>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => setBrushSize(2)}
                className={`w-8 h-8 rounded border ${
                  brushSize === 2 ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                } flex items-center justify-center`}
              >
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </button>
              <button 
                onClick={() => setBrushSize(5)}
                className={`w-8 h-8 rounded border ${
                  brushSize === 5 ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                } flex items-center justify-center`}
              >
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </button>
              <button 
                onClick={() => setBrushSize(10)}
                className={`w-8 h-8 rounded border ${
                  brushSize === 10 ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                } flex items-center justify-center`}
              >
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </button>
            </div>
            
            <button 
              onClick={clearCanvas}
              className="w-8 h-8 bg-red-500 text-white rounded flex items-center justify-center"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
          
          {/* Canvas */}
          <div className="flex-grow p-4">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-full border border-gray-300 rounded cursor-crosshair"
            />
          </div>
        </div>
      </div>
    </div>
  )
}