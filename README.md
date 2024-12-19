學生管理系統後端服務

簡介

本專案是一個基於 Express.js 和 MongoDB 的後端服務，提供基本的學生資料管理功能，包括新增、查詢、更新和刪除學生資料。該服務採用了 RESTful API 設計，並支持跨域請求。

功能

查詢所有學生資料

路徑：GET /api/v1/user/findAll

說明：返回所有學生的完整資料列表。

新增學生資料

路徑：POST /api/v1/user/create

說明：新增一筆學生資料至資料庫。

更新學生資料

路徑：PUT /api/v1/user/update/:id

說明：根據學生的唯一 ID 更新學生資料。

刪除學生資料

路徑：DELETE /api/v1/user/delete/:id

說明：根據學生的唯一 ID 刪除學生資料。

架構圖
使用者 
   |
   v
前端 
   1. 接收使用者互動
   2. 發送 HTTP 請求
   |
   v
後端 
   3. 接收請求，處理邏輯
   4. 查詢資料庫
   |
   v
資料庫 
   5. 返回查詢結果
   |
   v
後端 
   6. 格式化結果為 JSON
   |
   v
前端 
   7. 接收 JSON 回應
   8. 更新並展示 UI


