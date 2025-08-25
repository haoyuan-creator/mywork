import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mangahub'
    
    const conn = await mongoose.connect(mongoURI)
    
    console.log(`✅ MongoDB 连接成功: ${conn.connection.host}`)
    
    // 监听连接事件
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB 连接错误:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB 连接断开')
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB 重新连接')
    })
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error)
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    console.log('🔌 MongoDB 连接已关闭')
  } catch (error) {
    console.error('❌ 关闭数据库连接时出错:', error)
  }
}