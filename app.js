import express from 'express';
import Email from "./sendmail.js"
import random from "string-random"
const app = express();
app.use(express.urlencoded({ extended: false }))
app.post('/getmailcode', async (req, res) => {
  /**
   * 
   * 在这里可以先判断数据库有没有所保存的用户信息
   * 有与没有都需要删除用户让他的验证码失效重新发送
   */
//保存用户信息后期存入数据库
  const usercodeinfo = { 
    randomNumbers: random(5), //生成的验证码
    mailnumber: req.body.mailnumber,//用户邮箱
    time: Date.now()//生成验证码的时间
  }
  //定义发送的内容
  const sendMailobj = {
    html: `<div class="container-box"><h1>尊敬的${usercodeinfo.mailnumber}欢迎使用XXX:</h1><p>以下验证码作为忘记密码凭证</p><h2 style="color: red;">${usercodeinfo.randomNumbers}</h2></div></div>`,
    subject: "验证码测试"//主题
  }
  try {
    await new Email("2244420174@qq.com", "affwpmjlooxjebaf", usercodeinfo.mailnumber, sendMailobj).sendMail()
    /**
     * 
     * 在这里是发送成功后的操作
     */
    console.log(usercodeinfo);
    return res.send({
      code: 1,
      msg: "验证码发送成功",
      data: {
        time: usercodeinfo.time
      }
    })
  } catch (error) {
    return res.send({
      code: 0,
      msg: "验证码发送失败",
      data: {
        time: usercodeinfo.time
      }
    })
  }

})
app.listen(5139, () => {
  console.log('监听中');
})