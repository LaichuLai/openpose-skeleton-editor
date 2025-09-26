# OpenPose 人體骨架編輯器

一個支援 ControlNet 格式的線上人體姿勢編輯工具，讓使用者可以透過拖拽操作調整人體骨架關鍵點，並生成相容於 Stable Diffusion ControlNet 的骨架圖。

## ✨ 功能特色

### 🎯 核心功能
- **BODY_25 格式支援** - 完整支援 OpenPose BODY_25 關鍵點格式
- **拖拽式編輯** - 直覺的滑鼠拖拽操作調整關鍵點位置
- **即時預覽** - 即時顯示骨架變化和關鍵點連線
- **多格式輸出** - 支援 JSON 和 PNG 格式下載

### 🎨 視覺設計
- **彩色骨架** - 不同身體部位使用不同顏色標示
- **漸層連線** - 美觀的漸層色彩骨架連線
- **網格背景** - 輔助定位的網格背景
- **懸停效果** - 關鍵點懸停和拖拽高亮效果

### 🚀 進階功能
- **姿勢模板** - 內建 T-Pose、走路、跑步、坐姿等預設姿勢
- **面部關鍵點** - 可選的面部表情關鍵點支援
- **快捷鍵操作** - 支援鍵盤快捷鍵快速操作
- **響應式設計** - 適配不同螢幕尺寸的響應式介面

## 🛠️ 技術架構

### 前端技術
- **React 18** - 現代化的前端框架
- **Vite** - 快速的建置工具
- **Tailwind CSS** - 實用優先的 CSS 框架
- **HTML5 Canvas** - 高效能的圖形繪製

### 核心演算法
- **關鍵點檢測** - 滑鼠位置與關鍵點的距離計算
- **座標轉換** - 相對座標與畫布座標的雙向轉換
- **碰撞檢測** - 精確的關鍵點選取和拖拽判定

## 📋 使用說明

### 基本操作
1. **調整姿勢** - 點擊並拖拽紅色關鍵點調整人體姿勢
2. **選擇模板** - 使用左側姿勢模板快速設定常見姿勢
3. **調整畫布** - 修改畫布尺寸以符合需求
4. **下載結果** - 下載 JSON 格式或 PNG 圖片

### 快捷鍵
- `R` - 重置姿勢到預設狀態
- `Ctrl + S` - 下載 JSON 格式檔案
- `Ctrl + D` - 下載 PNG 骨架圖

### 輸出格式

#### JSON 格式
```json
{
  "people": [{
    "pose_keypoints_2d": [x1, y1, confidence1, x2, y2, confidence2, ...],
    "face_keypoints_2d": [...],
    "hand_left_keypoints_2d": [],
    "hand_right_keypoints_2d": []
  }]
}
```

#### PNG 格式
- 高品質的骨架圖片
- 透明背景或網格背景
- 可自訂解析度

## 🎯 應用場景

### AI 繪圖
- **Stable Diffusion** - 作為 ControlNet 的輸入控制圖
- **姿勢參考** - 為藝術創作提供精確的人體姿勢參考
- **動畫製作** - 關鍵幀姿勢設計和動畫預覽

### 研究開發
- **姿勢分析** - 人體動作分析和研究
- **資料標註** - 為機器學習模型準備訓練資料
- **原型開發** - 快速驗證姿勢相關的演算法

## 🚀 快速開始

### 線上使用
直接訪問部署的網站即可開始使用，無需安裝任何軟體。

### 本地開發

#### 環境需求
- Node.js 18+
- npm 或 yarn

#### 安裝步驟
```bash
# 複製專案
git clone https://github.com/LaichuLai/openpose-skeleton-editor.git
cd openpose-skeleton-editor

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

## 📊 技術規格

### 支援的關鍵點格式
- **BODY_25** - 25 個身體關鍵點（OpenPose 標準）
- **面部關鍵點** - 6 個簡化面部關鍵點
- **手部關鍵點** - 預留手部關鍵點擴展

### 畫布規格
- **解析度範圍** - 256×256 到 1024×1024
- **預設尺寸** - 512×512, 768×768, 512×768, 768×512
- **格式支援** - PNG, JSON

### 瀏覽器相容性
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 開發指南

### 專案結構
```
src/
├── components/
│   ├── PoseEditor.jsx      # 核心編輯器組件
│   └── ControlPanel.jsx    # 控制面板組件
├── App.jsx                 # 主應用程式
└── main.jsx               # 應用程式入口點
```

### 核心組件

#### PoseEditor
- 負責骨架繪製和互動邏輯
- 處理滑鼠事件和關鍵點拖拽
- 生成 OpenPose 格式的輸出資料

#### ControlPanel
- 提供畫布設定和姿勢模板
- 管理顯示選項和快捷操作
- 包含操作說明和快捷鍵提示

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改善這個專案！

### 開發流程
1. Fork 專案
2. 建立功能分支
3. 提交變更
4. 發起 Pull Request

### 程式碼規範
- 使用 ESLint 和 Prettier
- 遵循 React Hooks 最佳實踐
- 保持組件的單一職責原則

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- [OpenPose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) - 提供 BODY_25 格式規範
- [ControlNet](https://github.com/lllyasviel/ControlNet) - 啟發了這個專案的開發
- [React](https://reactjs.org/) - 優秀的前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 實用的 CSS 框架

## 📞 聯絡資訊

如有問題或建議，歡迎透過以下方式聯絡：

- GitHub Issues: [提交問題](https://github.com/LaichuLai/openpose-skeleton-editor/issues)
- Email: [專案維護者信箱]

---

**讓 AI 繪圖更精確，讓創作更自由！** 🎨✨
