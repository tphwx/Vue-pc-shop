var Mock = require('mockjs')
import banners from './banners.json'
import floors from './floors.json'
Mock.Random.cname()
Mock.Random.image()
Mock.Random.color()

Mock.mock("/mock/banners",'get',{
  code:200,
  'data|4': banners
})

Mock.mock("/mock/floors","get",{
  code:200,
  'data|3-5':floors
})