import { useState, useEffect, useRef } from 'react'
import PoseEditor from './components/PoseEditor.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import './App.css'

function App() {
  const [poseData, setPoseData] = useState(null)
  const [canvasSize, setCanvasSize] = useState({ width: 512, height: 512 })
  const [showFace, setShowFace] = useState(false)
  const [showHands, setShowHands] = useState(false)
  const canvasRef = useRef(null)

  const handlePoseChange = (newPoseData) => {
    setPoseData(newPoseData)
  }

  const handleDownloadSkeleton = () => {
    try {
      // 獲取畫布元素
      const canvas = document.querySelector('canvas')
      if (!canvas) {
        alert('找不到畫布元素，請稍後再試')
        return
      }

      // 建立下載連結
      const link = document.createElement('a')
      link.download = `skeleton_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`
      
      // 轉換畫布為圖片資料
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          link.href = url
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          console.log('骨架圖下載成功')
        } else {
          alert('圖片生成失敗，請稍後再試')
        }
      }, 'image/png', 1.0)
    } catch (error) {
      console.error('下載骨架圖時發生錯誤:', error)
      alert('下載失敗，請檢查瀏覽器設定')
    }
  }

  const handleDownloadJSON = () => {
    try {
      if (!poseData) {
        alert('沒有姿勢資料可下載，請先調整姿勢')
        return
      }

      // 格式化 JSON 資料
      const dataStr = JSON.stringify(poseData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json;charset=utf-8' })
      
      // 建立下載連結
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pose_keypoints_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`
      
      // 執行下載
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      console.log('JSON 檔案下載成功')
    } catch (error) {
      console.error('下載 JSON 時發生錯誤:', error)
      alert('下載失敗，請檢查瀏覽器設定')
    }
  }

  const handleReset = () => {
    // 重置姿勢功能
    setPoseData(null)
    // 觸發重置事件
    window.dispatchEvent(new CustomEvent('resetPose'))
  }

  // 監聽下載事件
  useEffect(() => {
    const handleDownloadJSONEvent = () => {
      handleDownloadJSON()
    }

    const handleDownloadImageEvent = () => {
      handleDownloadSkeleton()
    }

    window.addEventListener('downloadJSON', handleDownloadJSONEvent)
    window.addEventListener('downloadImage', handleDownloadImageEvent)

    return () => {
      window.removeEventListener('downloadJSON', handleDownloadJSONEvent)
      window.removeEventListener('downloadImage', handleDownloadImageEvent)
    }
  }, [poseData])

  // 測試下載功能
  const testDownload = () => {
    console.log('測試下載功能')
    console.log('當前姿勢資料:', poseData)
    console.log('畫布元素:', document.querySelector('canvas'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 頂部導航 */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                OpenPose 人體骨架編輯器
              </h1>
              <p className="text-sm text-slate-600">
                拖拽調整人體姿勢，生成 ControlNet 骨架圖
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleReset}
                className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors flex items-center gap-1"
                title="重置姿勢 (R)"
              >
                🔄 重置
              </button>
              <button 
                onClick={handleDownloadJSON}
                className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors flex items-center gap-1"
                title="下載 JSON (Ctrl+S)"
              >
                💾 JSON
              </button>
              <button 
                onClick={handleDownloadSkeleton}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                title="下載骨架圖 (Ctrl+D)"
              >
                📥 下載骨架圖
              </button>
              {/* 測試按鈕 - 開發時使用 */}
              <button 
                onClick={testDownload}
                className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                title="測試下載功能"
              >
                🔧
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容區域 */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 控制面板 */}
          <div className="lg:col-span-1">
            <ControlPanel
              canvasSize={canvasSize}
              setCanvasSize={setCanvasSize}
              showFace={showFace}
              setShowFace={setShowFace}
              showHands={showHands}
              setShowHands={setShowHands}
            />
          </div>

          {/* 編輯器區域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  ⚙️ 姿勢編輯器
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  使用滑鼠拖拽關鍵點調整人體姿勢，支援 BODY_25 格式
                </p>
              </div>
              <div className="p-6">
                <PoseEditor
                  canvasSize={canvasSize}
                  showFace={showFace}
                  showHands={showHands}
                  onPoseChange={handlePoseChange}
                  ref={canvasRef}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 狀態顯示 */}
      {poseData && (
        <div className="fixed bottom-4 left-4 bg-green-100 border border-green-300 text-green-700 px-3 py-2 rounded text-sm">
          ✅ 姿勢資料已準備就緒
        </div>
      )}

      {/* 底部資訊 */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-2">
              <p>支援 BODY_25 格式 • 相容 ControlNet • 即時預覽 • 快捷鍵操作</p>
            </div>
            <div className="flex justify-center items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>身體關鍵點</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>面部關鍵點</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>手部關鍵點</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 快捷鍵提示 */}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div>R: 重置 | Ctrl+S: 下載JSON | Ctrl+D: 下載圖片</div>
      </div>
    </div>
  )
}

export default App
