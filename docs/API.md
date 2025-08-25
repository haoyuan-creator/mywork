# MangaHub API 文档

## 概述

MangaHub API 是一个 RESTful API，为漫画社区平台提供后端服务。

## 基础信息

- **Base URL**: `http://localhost:3001/api`
- **认证方式**: Bearer Token (JWT)
- **内容类型**: `application/json`

## 认证

### 注册用户

```http
POST /auth/register
Content-Type: application/json

{
  "username": "用户名",
  "email": "user@example.com", 
  "password": "password123"
}
```

### 用户登录

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应**:
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "用户ID",
      "username": "用户名",
      "email": "邮箱",
      "role": "user"
    },
    "token": "JWT令牌"
  }
}
```

### 获取当前用户信息

```http
GET /auth/me
Authorization: Bearer <token>
```

## 漫画相关接口

### 获取漫画列表

```http
GET /manga?page=1&limit=20&search=关键词&genre=动作
```

**查询参数**:
- `page`: 页码 (默认: 1)
- `limit`: 每页数量 (默认: 20)
- `search`: 搜索关键词
- `genre`: 分类筛选
- `status`: 状态筛选 (ongoing, completed, hiatus, cancelled)
- `sortBy`: 排序字段 (newest, rating, popularity)

### 获取漫画详情

```http
GET /manga/:id
```

### 添加到收藏

```http
POST /manga/:id/favorite
Authorization: Bearer <token>
```

## 评价相关接口

### 获取漫画评价

```http
GET /reviews/manga/:mangaId?page=1&limit=10
```

### 创建评价

```http
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "manga": "漫画ID",
  "rating": 5,
  "title": "评价标题",
  "content": "评价内容",
  "spoilerWarning": false
}
```

### 点赞评价

```http
POST /reviews/:id/like
Authorization: Bearer <token>
```

## 社区帖子接口

### 获取帖子列表

```http
GET /posts?page=1&limit=20&category=discussion
```

**查询参数**:
- `category`: 分类 (discussion, recommendation, question, news, fan-art)
- `search`: 搜索关键词
- `sortBy`: 排序 (newest, popular, hot)

### 创建帖子

```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "帖子标题",
  "content": "帖子内容",
  "category": "discussion",
  "tags": ["标签1", "标签2"],
  "manga": "相关漫画ID (可选)"
}
```

## 用户相关接口

### 获取用户详情

```http
GET /users/:id
```

### 关注用户

```http
POST /users/:id/follow
Authorization: Bearer <token>
```

### 获取用户收藏

```http
GET /users/:id/favorites
```

## 错误响应

API 错误响应格式：

```json
{
  "success": false,
  "error": {
    "message": "错误描述",
    "details": "详细错误信息 (仅开发环境)"
  }
}
```

常见 HTTP 状态码：
- `200` - 成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未认证
- `403` - 无权限
- `404` - 资源不存在
- `500` - 服务器错误

## 分页响应

分页接口返回格式：

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 200,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

## 在线文档

启动开发服务器后，可以访问交互式 API 文档：

- **Swagger UI**: http://localhost:3001/api-docs