Question:
Compare nginx and Hadoop HDFS in terms of scalability.

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/patterns/event-driven-architecture.md
- wiki/patterns/distributed-systems.md

Answer:
Nginx and Hadoop HDFS approach system scalability from completely different architectural standpoints due to their disjoint design goals. Nginx optimizes for *concurrency scalability* at the networking layer, using an event-driven, non-blocking engine to manage millions of concurrent web transactions with minimal memory overhead per connection on a single server node. 

Conversely, Hadoop HDFS optimizes for *storage volume and throughput scalability* across thousands of nodes. HDFS scales horizontally by cutting massive data files into fixed large blocks (e.g., 128MB) and distributing them across DataNodes, coordinated by a master NameNode. While Nginx minimizes request latency through efficient single-node CPU scheduling, HDFS maximizes cluster storage and broad data processing throughput.

Sources used:
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
