# Example Answer: nginx vs HDFS Scalability

Question:
Compare nginx and Hadoop HDFS in terms of scalability.

Pages consulted:
- wiki/index.md
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md

Answer:
nginx and Hadoop HDFS scale different architectural forces. nginx scales
network concurrency by multiplexing many connections in non-blocking workers
instead of allocating one thread or process per client. HDFS scales storage
capacity and aggregate I/O by splitting files into replicated blocks across
DataNodes while the NameNode coordinates namespace metadata. nginx focuses on
connection and request throughput; HDFS focuses on distributed data capacity and
high-throughput block streaming.

Sources used:
- wiki/projects/nginx.md
- wiki/projects/hadoop-hdfs.md
- wiki/quality-attributes/scalability.md
- wiki/adrs/nginx-adr-001-event-driven-worker-model.md
- wiki/adrs/hdfs-adr-001-namenode-datanode-separation.md
