export interface GlossaryArticle {
  slug: string;
  title: string;
  company: string;
  period: string;
  excerpt: string | null;
  body: string | null;
}

export const glossaryArticles: GlossaryArticle[] = [
  {
    slug: 'apache-cassandra',
    title: 'Apache Cassandra',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: 'A distributed NoSQL database designed for high scalability and fault tolerance across cloud infrastructure.',
    body: 'Apache Cassandra is a powerful distributed database that excels in handling massive volumes of data across multiple servers. Originally developed by Facebook and now maintained by the Apache Software Foundation, Cassandra is built for high availability and fault tolerance, making it ideal for applications that require constant uptime and geographic distribution.\n\nThe database uses a decentralized architecture where all nodes are equal, meaning there\'s no single point of failure. This makes it particularly valuable for financial services, telecommunications, and other industries where data loss is unacceptable. Cassandra\'s ability to scale horizontally—adding more nodes to increase capacity—makes it cost-effective for growing applications.',
  },
  {
    slug: 'shift-left',
    title: 'Shift Left',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: 'A development methodology that moves testing, security, and quality assurance earlier in the software development lifecycle.',
    body: 'Shift Left represents a fundamental change in how teams approach software development. Rather than waiting until the end of the development cycle to test code and identify issues, shift-left practices push quality checks, security reviews, and testing activities to the earliest possible stages.\n\nThis approach has multiple benefits. By catching bugs earlier, teams reduce the cost of fixes—a bug discovered during development is far cheaper to resolve than one discovered in production. Shift-left also improves security by integrating security checks into the development process from day one, rather than bolting them on at the end. For DevOps teams, shift-left practices accelerate deployment cycles and improve overall software reliability.',
  },
  {
    slug: 'memory-management',
    title: 'Memory Management',
    company: 'Azul Systems',
    period: 'Jan 2023–Apr 2024',
    excerpt: 'The process of allocating, using, and freeing computer memory efficiently during program execution.',
    body: 'Memory management is one of the most critical aspects of software performance, particularly for applications built on the Java Virtual Machine (JVM). Every program requires memory to store variables, objects, and data structures. How efficiently a program manages this memory directly impacts its performance, stability, and scalability.\n\nThere are two primary approaches to memory management: manual management, where developers explicitly allocate and free memory, and automatic management, where the garbage collector handles cleanup. Java uses automatic garbage collection, which frees developers from many memory management tasks but also requires understanding how the JVM allocates and reclaims memory.\n\nProper memory management prevents memory leaks, reduces latency spikes from garbage collection pauses, and ensures applications can scale to handle large workloads. Understanding memory management is essential for anyone building high-performance distributed systems.',
  },
];
