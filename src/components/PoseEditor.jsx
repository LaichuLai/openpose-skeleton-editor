import { useRef, useEffect, useState, useCallback } from 'react'

// BODY_25 關鍵點定義
const BODY_25_KEYPOINTS = [
  { id: 0, name: 'Nose', x: 0.5, y: 0.3, color: '#ef4444' },
  { id: 1, name: 'Neck', x: 0.5, y: 0.4, color: '#3b82f6' },
  { id: 2, name: 'RShoulder', x: 0.4, y: 0.4, color: '#10b981' },
  { id: 3, name: 'RElbow', x: 0.35, y: 0.5, color: '#10b981' },
  { id: 4, name: 'RWrist', x: 0.3, y: 0.6, color: '#10b981' },
  { id: 5, name: 'LShoulder', x: 0.6, y: 0.4, color: '#8b5cf6' },
  { id: 6, name: 'LElbow', x: 0.65, y: 0.5, color: '#8b5cf6' },
  { id: 7, name: 'LWrist', x: 0.7, y: 0.6, color: '#8b5cf6' },
  { id: 8, name: 'MidHip', x: 0.5, y: 0.65, color: '#f59e0b' },
  { id: 9, name: 'RHip', x: 0.45, y: 0.65, color: '#f59e0b' },
  { id: 10, name: 'RKnee', x: 0.45, y: 0.8, color: '#f59e0b' },
  { id: 11, name: 'RAnkle', x: 0.45, y: 0.95, color: '#f59e0b' },
  { id: 12, name: 'LHip', x: 0.55, y: 0.65, color: '#ec4899' },
  { id: 13, name: 'LKnee', x: 0.55, y: 0.8, color: '#ec4899' },
  { id: 14, name: 'LAnkle', x: 0.55, y: 0.95, color: '#ec4899' },
  { id: 15, name: 'REye', x: 0.48, y: 0.28, color: '#ef4444' },
  { id: 16, name: 'LEye', x: 0.52, y: 0.28, color: '#ef4444' },
  { id: 17, name: 'REar', x: 0.46, y: 0.29, color: '#ef4444' },
  { id: 18, name: 'LEar', x: 0.54, y: 0.29, color: '#ef4444' },
  { id: 19, name: 'LBigToe', x: 0.55, y: 0.98, color: '#6b7280' },
  { id: 20, name: 'LSmallToe', x: 0.57, y: 0.98, color: '#6b7280' },
  { id: 21, name: 'LHeel', x: 0.53, y: 0.98, color: '#6b7280' },
  { id: 22, name: 'RBigToe', x: 0.45, y: 0.98, color: '#6b7280' },
  { id: 23, name: 'RSmallToe', x: 0.43, y: 0.98, color: '#6b7280' },
  { id: 24, name: 'RHeel', x: 0.47, y: 0.98, color: '#6b7280' }
]

// 姿勢模板定義
const POSE_TEMPLATES = {
  tpose: [
    { id: 0, name: 'Nose', x: 0.5, y: 0.3, color: '#ef4444' },
    { id: 1, name: 'Neck', x: 0.5, y: 0.4, color: '#3b82f6' },
    { id: 2, name: 'RShoulder', x: 0.35, y: 0.4, color: '#10b981' },
    { id: 3, name: 'RElbow', x: 0.25, y: 0.4, color: '#10b981' },
    { id: 4, name: 'RWrist', x: 0.15, y: 0.4, color: '#10b981' },
    { id: 5, name: 'LShoulder', x: 0.65, y: 0.4, color: '#8b5cf6' },
    { id: 6, name: 'LElbow', x: 0.75, y: 0.4, color: '#8b5cf6' },
    { id: 7, name: 'LWrist', x: 0.85, y: 0.4, color: '#8b5cf6' },
    { id: 8, name: 'MidHip', x: 0.5, y: 0.65, color: '#f59e0b' },
    { id: 9, name: 'RHip', x: 0.45, y: 0.65, color: '#f59e0b' },
    { id: 10, name: 'RKnee', x: 0.45, y: 0.8, color: '#f59e0b' },
    { id: 11, name: 'RAnkle', x: 0.45, y: 0.95, color: '#f59e0b' },
    { id: 12, name: 'LHip', x: 0.55, y: 0.65, color: '#ec4899' },
    { id: 13, name: 'LKnee', x: 0.55, y: 0.8, color: '#ec4899' },
    { id: 14, name: 'LAnkle', x: 0.55, y: 0.95, color: '#ec4899' },
    { id: 15, name: 'REye', x: 0.48, y: 0.28, color: '#ef4444' },
    { id: 16, name: 'LEye', x: 0.52, y: 0.28, color: '#ef4444' },
    { id: 17, name: 'REar', x: 0.46, y: 0.29, color: '#ef4444' },
    { id: 18, name: 'LEar', x: 0.54, y: 0.29, color: '#ef4444' },
    { id: 19, name: 'LBigToe', x: 0.55, y: 0.98, color: '#6b7280' },
    { id: 20, name: 'LSmallToe', x: 0.57, y: 0.98, color: '#6b7280' },
    { id: 21, name: 'LHeel', x: 0.53, y: 0.98, color: '#6b7280' },
    { id: 22, name: 'RBigToe', x: 0.45, y: 0.98, color: '#6b7280' },
    { id: 23, name: 'RSmallToe', x: 0.43, y: 0.98, color: '#6b7280' },
    { id: 24, name: 'RHeel', x: 0.47, y: 0.98, color: '#6b7280' }
  ],
  walking: [
    { id: 0, name: 'Nose', x: 0.5, y: 0.3, color: '#ef4444' },
    { id: 1, name: 'Neck', x: 0.5, y: 0.4, color: '#3b82f6' },
    { id: 2, name: 'RShoulder', x: 0.4, y: 0.4, color: '#10b981' },
    { id: 3, name: 'RElbow', x: 0.38, y: 0.48, color: '#10b981' },
    { id: 4, name: 'RWrist', x: 0.35, y: 0.55, color: '#10b981' },
    { id: 5, name: 'LShoulder', x: 0.6, y: 0.4, color: '#8b5cf6' },
    { id: 6, name: 'LElbow', x: 0.62, y: 0.52, color: '#8b5cf6' },
    { id: 7, name: 'LWrist', x: 0.65, y: 0.65, color: '#8b5cf6' },
    { id: 8, name: 'MidHip', x: 0.5, y: 0.65, color: '#f59e0b' },
    { id: 9, name: 'RHip', x: 0.45, y: 0.65, color: '#f59e0b' },
    { id: 10, name: 'RKnee', x: 0.42, y: 0.78, color: '#f59e0b' },
    { id: 11, name: 'RAnkle', x: 0.4, y: 0.92, color: '#f59e0b' },
    { id: 12, name: 'LHip', x: 0.55, y: 0.65, color: '#ec4899' },
    { id: 13, name: 'LKnee', x: 0.58, y: 0.82, color: '#ec4899' },
    { id: 14, name: 'LAnkle', x: 0.6, y: 0.98, color: '#ec4899' },
    { id: 15, name: 'REye', x: 0.48, y: 0.28, color: '#ef4444' },
    { id: 16, name: 'LEye', x: 0.52, y: 0.28, color: '#ef4444' },
    { id: 17, name: 'REar', x: 0.46, y: 0.29, color: '#ef4444' },
    { id: 18, name: 'LEar', x: 0.54, y: 0.29, color: '#ef4444' },
    { id: 19, name: 'LBigToe', x: 0.6, y: 1.0, color: '#6b7280' },
    { id: 20, name: 'LSmallToe', x: 0.62, y: 1.0, color: '#6b7280' },
    { id: 21, name: 'LHeel', x: 0.58, y: 1.0, color: '#6b7280' },
    { id: 22, name: 'RBigToe', x: 0.4, y: 0.94, color: '#6b7280' },
    { id: 23, name: 'RSmallToe', x: 0.38, y: 0.94, color: '#6b7280' },
    { id: 24, name: 'RHeel', x: 0.42, y: 0.94, color: '#6b7280' }
  ],
  running: [
    { id: 0, name: 'Nose', x: 0.5, y: 0.3, color: '#ef4444' },
    { id: 1, name: 'Neck', x: 0.5, y: 0.4, color: '#3b82f6' },
    { id: 2, name: 'RShoulder', x: 0.4, y: 0.4, color: '#10b981' },
    { id: 3, name: 'RElbow', x: 0.32, y: 0.45, color: '#10b981' },
    { id: 4, name: 'RWrist', x: 0.25, y: 0.5, color: '#10b981' },
    { id: 5, name: 'LShoulder', x: 0.6, y: 0.4, color: '#8b5cf6' },
    { id: 6, name: 'LElbow', x: 0.68, y: 0.55, color: '#8b5cf6' },
    { id: 7, name: 'LWrist', x: 0.75, y: 0.7, color: '#8b5cf6' },
    { id: 8, name: 'MidHip', x: 0.5, y: 0.65, color: '#f59e0b' },
    { id: 9, name: 'RHip', x: 0.45, y: 0.65, color: '#f59e0b' },
    { id: 10, name: 'RKnee', x: 0.38, y: 0.75, color: '#f59e0b' },
    { id: 11, name: 'RAnkle', x: 0.32, y: 0.85, color: '#f59e0b' },
    { id: 12, name: 'LHip', x: 0.55, y: 0.65, color: '#ec4899' },
    { id: 13, name: 'LKnee', x: 0.62, y: 0.85, color: '#ec4899' },
    { id: 14, name: 'LAnkle', x: 0.68, y: 1.0, color: '#ec4899' },
    { id: 15, name: 'REye', x: 0.48, y: 0.28, color: '#ef4444' },
    { id: 16, name: 'LEye', x: 0.52, y: 0.28, color: '#ef4444' },
    { id: 17, name: 'REar', x: 0.46, y: 0.29, color: '#ef4444' },
    { id: 18, name: 'LEar', x: 0.54, y: 0.29, color: '#ef4444' },
    { id: 19, name: 'LBigToe', x: 0.68, y: 1.02, color: '#6b7280' },
    { id: 20, name: 'LSmallToe', x: 0.7, y: 1.02, color: '#6b7280' },
    { id: 21, name: 'LHeel', x: 0.66, y: 1.02, color: '#6b7280' },
    { id: 22, name: 'RBigToe', x: 0.32, y: 0.87, color: '#6b7280' },
    { id: 23, name: 'RSmallToe', x: 0.3, y: 0.87, color: '#6b7280' },
    { id: 24, name: 'RHeel', x: 0.34, y: 0.87, color: '#6b7280' }
  ],
  sitting: [
    { id: 0, name: 'Nose', x: 0.5, y: 0.3, color: '#ef4444' },
    { id: 1, name: 'Neck', x: 0.5, y: 0.4, color: '#3b82f6' },
    { id: 2, name: 'RShoulder', x: 0.4, y: 0.4, color: '#10b981' },
    { id: 3, name: 'RElbow', x: 0.35, y: 0.5, color: '#10b981' },
    { id: 4, name: 'RWrist', x: 0.32, y: 0.6, color: '#10b981' },
    { id: 5, name: 'LShoulder', x: 0.6, y: 0.4, color: '#8b5cf6' },
    { id: 6, name: 'LElbow', x: 0.65, y: 0.5, color: '#8b5cf6' },
    { id: 7, name: 'LWrist', x: 0.68, y: 0.6, color: '#8b5cf6' },
    { id: 8, name: 'MidHip', x: 0.5, y: 0.65, color: '#f59e0b' },
    { id: 9, name: 'RHip', x: 0.45, y: 0.65, color: '#f59e0b' },
    { id: 10, name: 'RKnee', x: 0.45, y: 0.75, color: '#f59e0b' },
    { id: 11, name: 'RAnkle', x: 0.45, y: 0.85, color: '#f59e0b' },
    { id: 12, name: 'LHip', x: 0.55, y: 0.65, color: '#ec4899' },
    { id: 13, name: 'LKnee', x: 0.55, y: 0.75, color: '#ec4899' },
    { id: 14, name: 'LAnkle', x: 0.55, y: 0.85, color: '#ec4899' },
    { id: 15, name: 'REye', x: 0.48, y: 0.28, color: '#ef4444' },
    { id: 16, name: 'LEye', x: 0.52, y: 0.28, color: '#ef4444' },
    { id: 17, name: 'REar', x: 0.46, y: 0.29, color: '#ef4444' },
    { id: 18, name: 'LEar', x: 0.54, y: 0.29, color: '#ef4444' },
    { id: 19, name: 'LBigToe', x: 0.55, y: 0.87, color: '#6b7280' },
    { id: 20, name: 'LSmallToe', x: 0.57, y: 0.87, color: '#6b7280' },
    { id: 21, name: 'LHeel', x: 0.53, y: 0.87, color: '#6b7280' },
    { id: 22, name: 'RBigToe', x: 0.45, y: 0.87, color: '#6b7280' },
    { id: 23, name: 'RSmallToe', x: 0.43, y: 0.87, color: '#6b7280' },
    { id: 24, name: 'RHeel', x: 0.47, y: 0.87, color: '#6b7280' }
  ]
}

// 面部表情關鍵點（簡化版）
const FACE_KEYPOINTS = [
  { id: 100, name: 'FaceCenter', x: 0.5, y: 0.3, color: '#fbbf24' },
  { id: 101, name: 'LeftEyebrow', x: 0.47, y: 0.27, color: '#fbbf24' },
  { id: 102, name: 'RightEyebrow', x: 0.53, y: 0.27, color: '#fbbf24' },
  { id: 103, name: 'LeftMouth', x: 0.48, y: 0.32, color: '#fbbf24' },
  { id: 104, name: 'RightMouth', x: 0.52, y: 0.32, color: '#fbbf24' },
  { id: 105, name: 'Chin', x: 0.5, y: 0.35, color: '#fbbf24' }
]

// 骨架連線定義
const SKELETON_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // 右臂
  [1, 5], [5, 6], [6, 7], // 左臂
  [1, 8], // 軀幹
  [8, 9], [9, 10], [10, 11], // 右腿
  [8, 12], [12, 13], [13, 14], // 左腿
  [0, 15], [0, 16], // 眼睛
  [15, 17], [16, 18], // 耳朵
  [11, 22], [22, 23], [11, 24], // 右腳
  [14, 19], [19, 20], [14, 21] // 左腳
]

// 面部連線
const FACE_CONNECTIONS = [
  [101, 102], [103, 104], [100, 105]
]

const PoseEditor = ({ canvasSize, showFace, showHands, onPoseChange }) => {
  const canvasRef = useRef(null)
  const [keypoints, setKeypoints] = useState(BODY_25_KEYPOINTS)
  const [faceKeypoints, setFaceKeypoints] = useState(FACE_KEYPOINTS)
  const [draggedPoint, setDraggedPoint] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // 將相對座標轉換為畫布座標
  const toCanvasCoords = useCallback((relativeX, relativeY) => {
    return {
      x: relativeX * canvasSize.width,
      y: relativeY * canvasSize.height
    }
  }, [canvasSize])

  // 將畫布座標轉換為相對座標
  const toRelativeCoords = useCallback((canvasX, canvasY) => {
    return {
      x: canvasX / canvasSize.width,
      y: canvasY / canvasSize.height
    }
  }, [canvasSize])

  // 載入姿勢模板
  const loadPoseTemplate = useCallback((templateName) => {
    if (POSE_TEMPLATES[templateName]) {
      setKeypoints(POSE_TEMPLATES[templateName])
      setDraggedPoint(null)
      setHoveredPoint(null)
    }
  }, [])

  // 監聽姿勢模板載入事件
  useEffect(() => {
    const handleLoadPoseTemplate = (event) => {
      loadPoseTemplate(event.detail.template)
    }

    window.addEventListener('loadPoseTemplate', handleLoadPoseTemplate)
    return () => {
      window.removeEventListener('loadPoseTemplate', handleLoadPoseTemplate)
    }
  }, [loadPoseTemplate])

  // 快捷鍵處理
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault()
          resetPose()
        }
      } else if (event.ctrlKey || event.metaKey) {
        if (event.key === 's' || event.key === 'S') {
          event.preventDefault()
          // 觸發 JSON 下載
          window.dispatchEvent(new CustomEvent('downloadJSON'))
        } else if (event.key === 'd' || event.key === 'D') {
          event.preventDefault()
          // 觸發圖片下載
          window.dispatchEvent(new CustomEvent('downloadImage'))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // 繪製骨架
  const drawSkeleton = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 設定畫布背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#f8fafc')
    gradient.addColorStop(1, '#e2e8f0')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 繪製網格
    ctx.strokeStyle = '#cbd5e1'
    ctx.lineWidth = 0.5
    const gridSize = 32
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // 繪製骨架連線
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    SKELETON_CONNECTIONS.forEach(([startId, endId]) => {
      const startPoint = keypoints.find(p => p.id === startId)
      const endPoint = keypoints.find(p => p.id === endId)
      
      if (startPoint && endPoint) {
        const start = toCanvasCoords(startPoint.x, startPoint.y)
        const end = toCanvasCoords(endPoint.x, endPoint.y)
        
        // 漸層連線
        const lineGradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
        lineGradient.addColorStop(0, startPoint.color)
        lineGradient.addColorStop(1, endPoint.color)
        ctx.strokeStyle = lineGradient
        
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
      }
    })

    // 繪製面部連線（如果啟用）
    if (showFace) {
      ctx.lineWidth = 2
      FACE_CONNECTIONS.forEach(([startId, endId]) => {
        const startPoint = faceKeypoints.find(p => p.id === startId)
        const endPoint = faceKeypoints.find(p => p.id === endId)
        
        if (startPoint && endPoint) {
          const start = toCanvasCoords(startPoint.x, startPoint.y)
          const end = toCanvasCoords(endPoint.x, endPoint.y)
          
          ctx.strokeStyle = '#fbbf24'
          ctx.beginPath()
          ctx.moveTo(start.x, start.y)
          ctx.lineTo(end.x, end.y)
          ctx.stroke()
        }
      })
    }

    // 繪製身體關鍵點
    keypoints.forEach((point) => {
      const { x, y } = toCanvasCoords(point.x, point.y)
      
      // 關鍵點陰影
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.beginPath()
      ctx.arc(x + 2, y + 2, 8, 0, 2 * Math.PI)
      ctx.fill()
      
      // 關鍵點主體
      ctx.fillStyle = point.color
      ctx.beginPath()
      ctx.arc(x, y, 7, 0, 2 * Math.PI)
      ctx.fill()
      
      // 關鍵點邊框
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // 懸停效果
      if (hoveredPoint && hoveredPoint.id === point.id) {
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, 2 * Math.PI)
        ctx.stroke()
      }
      
      // 拖拽高亮
      if (draggedPoint && draggedPoint.id === point.id) {
        ctx.strokeStyle = '#ef4444'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, 2 * Math.PI)
        ctx.stroke()
        
        // 顯示關鍵點名稱
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
        ctx.font = '12px sans-serif'
        const textWidth = ctx.measureText(point.name).width
        ctx.fillRect(x - textWidth/2 - 4, y - 25, textWidth + 8, 16)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(point.name, x - textWidth/2, y - 12)
      }
    })

    // 繪製面部關鍵點（如果啟用）
    if (showFace) {
      faceKeypoints.forEach((point) => {
        const { x, y } = toCanvasCoords(point.x, point.y)
        
        ctx.fillStyle = point.color
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()
        
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }
  }, [keypoints, faceKeypoints, canvasSize, draggedPoint, hoveredPoint, showFace, toCanvasCoords])

  // 獲取滑鼠位置
  const getMousePos = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }, [])

  // 找到最近的關鍵點
  const findNearestKeypoint = useCallback((mouseX, mouseY) => {
    let nearest = null
    let minDistance = Infinity

    // 檢查身體關鍵點
    keypoints.forEach((point) => {
      const { x, y } = toCanvasCoords(point.x, point.y)
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
      
      if (distance < 15 && distance < minDistance) {
        minDistance = distance
        nearest = { ...point, type: 'body' }
      }
    })

    // 檢查面部關鍵點（如果啟用）
    if (showFace) {
      faceKeypoints.forEach((point) => {
        const { x, y } = toCanvasCoords(point.x, point.y)
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        
        if (distance < 10 && distance < minDistance) {
          minDistance = distance
          nearest = { ...point, type: 'face' }
        }
      })
    }

    return nearest
  }, [keypoints, faceKeypoints, showFace, toCanvasCoords])

  // 滑鼠事件處理
  const handleMouseDown = useCallback((e) => {
    const mousePos = getMousePos(e)
    const nearestPoint = findNearestKeypoint(mousePos.x, mousePos.y)
    
    if (nearestPoint) {
      setDraggedPoint(nearestPoint)
      setMousePos(mousePos)
    }
  }, [getMousePos, findNearestKeypoint])

  const handleMouseMove = useCallback((e) => {
    const currentMousePos = getMousePos(e)
    setMousePos(currentMousePos)

    // 懸停檢測
    const nearestPoint = findNearestKeypoint(currentMousePos.x, currentMousePos.y)
    setHoveredPoint(nearestPoint)

    if (draggedPoint) {
      const relativePos = toRelativeCoords(currentMousePos.x, currentMousePos.y)
      
      // 限制座標範圍
      const clampedX = Math.max(0, Math.min(1, relativePos.x))
      const clampedY = Math.max(0, Math.min(1, relativePos.y))
      
      if (draggedPoint.type === 'body') {
        setKeypoints(prev => prev.map(point => 
          point.id === draggedPoint.id 
            ? { ...point, x: clampedX, y: clampedY }
            : point
        ))
      } else if (draggedPoint.type === 'face') {
        setFaceKeypoints(prev => prev.map(point => 
          point.id === draggedPoint.id 
            ? { ...point, x: clampedX, y: clampedY }
            : point
        ))
      }
    }
  }, [draggedPoint, getMousePos, toRelativeCoords, findNearestKeypoint])

  const handleMouseUp = useCallback(() => {
    setDraggedPoint(null)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setDraggedPoint(null)
    setHoveredPoint(null)
  }, [])

  // 生成 OpenPose JSON 格式
  const generatePoseData = useCallback(() => {
    const poseKeypoints2d = []
    const faceKeypoints2d = []
    
    keypoints.forEach((point) => {
      const { x, y } = toCanvasCoords(point.x, point.y)
      poseKeypoints2d.push(x, y, 1.0) // x, y, confidence
    })

    if (showFace) {
      faceKeypoints.forEach((point) => {
        const { x, y } = toCanvasCoords(point.x, point.y)
        faceKeypoints2d.push(x, y, 1.0)
      })
    }

    const poseData = {
      people: [{
        pose_keypoints_2d: poseKeypoints2d,
        face_keypoints_2d: faceKeypoints2d,
        hand_left_keypoints_2d: [],
        hand_right_keypoints_2d: []
      }]
    }

    return poseData
  }, [keypoints, faceKeypoints, showFace, toCanvasCoords])

  // 當關鍵點改變時，通知父組件
  useEffect(() => {
    const poseData = generatePoseData()
    onPoseChange(poseData)
  }, [keypoints, faceKeypoints, generatePoseData, onPoseChange])

  // 繪製畫布
  useEffect(() => {
    drawSkeleton()
  }, [drawSkeleton])

  // 重置姿勢
  const resetPose = () => {
    setKeypoints(BODY_25_KEYPOINTS)
    setFaceKeypoints(FACE_KEYPOINTS)
    setDraggedPoint(null)
    setHoveredPoint(null)
  }

  return (
    <div className="space-y-4">
      {/* 編輯器狀態 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">BODY_25</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">{canvasSize.width}×{canvasSize.height}</span>
          {showFace && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">面部</span>
          )}
          {draggedPoint && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded animate-pulse">
              拖拽中: {draggedPoint.name}
            </span>
          )}
          {hoveredPoint && !draggedPoint && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
              懸停: {hoveredPoint.name}
            </span>
          )}
        </div>
        <button 
          onClick={resetPose}
          className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          重置姿勢
        </button>
      </div>

      {/* 畫布容器 */}
      <div className="relative border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-white shadow-inner">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="block cursor-crosshair transition-all duration-200"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
        
        {/* 座標顯示 */}
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}
        </div>

        {/* 功能提示 */}
        <div className="absolute bottom-2 right-2 bg-white/90 text-slate-600 text-xs px-2 py-1 rounded backdrop-blur-sm">
          拖拽紅點調整姿勢
        </div>
      </div>

      {/* 關鍵點資訊 */}
      <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
        <div className="flex items-center justify-between">
          <span>總關鍵點: {keypoints.length + (showFace ? faceKeypoints.length : 0)}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">身體</span>
            </div>
            {showFace && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">面部</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoseEditor
