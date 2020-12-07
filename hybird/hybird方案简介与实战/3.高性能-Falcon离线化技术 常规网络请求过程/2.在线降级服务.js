离线过程抽象的来看，本质是一个"客户端实现的静态资源服务器"，类似于webpack dev server。

步骤：
1.静态资源
2.nginx 1层（反向代理）
3.nginx 2层（负载均衡）
4.Python/node服务器
5.静态资源文件