const ControlPanel = ({
  canvasSize,
  setCanvasSize,
  showFace,
  setShowFace,
  showHands,
  setShowHands
}) => {
  const handleWidthChange = (e) => {
    setCanvasSize(prev => ({ ...prev, width: parseInt(e.target.value) }))
  }

  const handleHeightChange = (e) => {
    setCanvasSize(prev => ({ ...prev, height: parseInt(e.target.value) }))
  }

  const presetSizes = [
    { name: '512x512', width: 512, height: 512 },
    { name: '768x768', width: 768, height: 768 },
    { name: '512x768', width: 512, height: 768 },
    { name: '768x512', width: 768, height: 512 }
  ]

  const handlePresetSize = (preset) => {
    setCanvasSize({ width: preset.width, height: preset.height })
  }

  // 預設姿勢模板
  const poseTemplates = [
    {
      name: 'T-Pose',
      description: '標準 T 字姿勢',
      icon: '🤸‍♂️',
      pose: 'tpose'
    },
    {
      name: '走路',
      description: '行走姿勢',
      icon: '🚶‍♂️',
      pose: 'walking'
    },
    {
      name: '跑步',
      description: '跑步姿勢',
      icon: '🏃‍♂️',
      pose: 'running'
    },
    {
      name: '坐姿',
      description: '坐著姿勢',
      icon: '🪑',
      pose: 'sitting'
    }
  ]

  const handlePoseTemplate = (template) => {
    // 觸發自定義事件來載入姿勢模板
    window.dispatchEvent(new CustomEvent('loadPoseTemplate', { 
      detail: { template: template.pose } 
    }))
  }

  return (
    <div className="space-y-4">
      {/* 畫布設定 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          🖼️ 畫布設定
        </h3>
        
        {/* 預設尺寸 */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">預設尺寸</label>
          <div className="grid grid-cols-2 gap-2">
            {presetSizes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetSize(preset)}
                className="text-xs px-2 py-1 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <hr className="my-3" />

        {/* 寬度調整 */}
        <div className="mb-3">
          <label className="text-sm font-medium mb-2 block">
            寬度: {canvasSize.width}px
          </label>
          <input
            type="range"
            min="256"
            max="1024"
            step="32"
            value={canvasSize.width}
            onChange={handleWidthChange}
            className="w-full accent-blue-500"
          />
        </div>

        {/* 高度調整 */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            高度: {canvasSize.height}px
          </label>
          <input
            type="range"
            min="256"
            max="1024"
            step="32"
            value={canvasSize.height}
            onChange={handleHeightChange}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      {/* 姿勢模板 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          🎭 姿勢模板
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          {poseTemplates.map((template) => (
            <button
              key={template.name}
              onClick={() => handlePoseTemplate(template)}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
              title={template.description}
            >
              <div className="text-lg mb-1">{template.icon}</div>
              <div className="text-xs font-medium">{template.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 顯示選項 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          👁️ 顯示選項
        </h3>
        
        {/* 面部關鍵點 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">面部關鍵點</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showFace}
              onChange={(e) => setShowFace(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* 手部關鍵點 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">手部關鍵點</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showHands}
              onChange={(e) => setShowHands(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* 操作說明 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          📖 操作說明
        </h3>
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>拖拽關鍵點調整姿勢</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>支援 BODY_25 格式</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>即時生成骨架圖</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>下載 JSON 和圖片</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>使用姿勢模板快速開始</span>
          </div>
        </div>
      </div>

      {/* 快捷鍵說明 */}
      <div className="bg-slate-50 rounded-lg p-3">
        <h4 className="text-sm font-semibold mb-2 text-slate-700">快捷鍵</h4>
        <div className="space-y-1 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>重置姿勢</span>
            <kbd className="px-1 py-0.5 bg-white rounded text-xs">R</kbd>
          </div>
          <div className="flex justify-between">
            <span>下載 JSON</span>
            <kbd className="px-1 py-0.5 bg-white rounded text-xs">Ctrl+S</kbd>
          </div>
          <div className="flex justify-between">
            <span>下載圖片</span>
            <kbd className="px-1 py-0.5 bg-white rounded text-xs">Ctrl+D</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
