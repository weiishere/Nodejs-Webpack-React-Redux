结构配置：{versionId:'1',data:['banner','userInfo','hotFund']};
banner:{versionId:'1',data:[{imgUrl:'http://img/***.png',link:''},{imgUrl:'//img/***.png',link:''},{imgUrl:'//img/***.png',link:''}]};
基金：{versionId:'1',data:[{id:'1122'},{id:'1122'},{id:'1122'},{id:'1122'}]};

API:
默认组件列表 [{ComponentId:'1',name:'banner'},{ComponentId:'2',name:'userInfo'},{ComponentId:'3',name:'hotFund'}]
用户版本管理（增删查），根据用户id取得版本list(只有一条数据为active=true)(初始用户应具备一个默认空的的版本信息) [{versionId:'1',userId:'123',name:'v1',time:'2017-2-28',active:true},{versionId:'2',userId:'123',name:'v3',time:'2017-3-1',active:false}]
获取用户激活的版本（active=true，前端需要）

结构配置（增删改查）,根据版本ID获取
banner（增删改查）,根据版本ID获取
基金数据（增删改查）,根据版本ID获取

获取所有待选择的基金list
