# Purna Lokesh Reddy &mdash; DevOps Engineer (AI & ML) Portfolio

Welcome to the engineering portfolio of **Purna Lokesh Reddy** (`itachi-rdy79`), DevOps Engineer (AI & ML) based in **Cincinnati, OH**.

This portfolio is an interactive workstation featuring an in-browser Linux/DevOps terminal simulator, a real-time mathematical decision boundary machine learning sandbox, an automated DevSecOps/MLOps pipeline architecture visualizer, verified enterprise work history (Shopify, Uber), and direct links to open-source infrastructure projects.

---

## Executive Summary

- **Role**: DevOps Engineer (AI & ML)
- **Location**: Cincinnati, OH, USA
- **Email**: [lokeshreddych129@gmail.com](mailto:lokeshreddych129@gmail.com)
- **Phone**: [513-578-3720](tel:5135783720)
- **GitHub**: [github.com/itachi-rdy79](https://github.com/itachi-rdy79)
- **Education**: Master's in Information Technology &mdash; University of Cincinnati, OH, USA (Graduated: Dec 12, 2024)

---

## Proven Enterprise Experience

### 1. Shopify &mdash; DevOps Engineer (AI & ML)
*Remote (USA) | August 2024 &ndash; Present*
- Engineered and maintained multi-region **AWS EKS** infrastructure using **Terraform, Helm, and Ansible**, achieving **99.97% uptime** across high-traffic production environments, including Black Friday and flash-sale events.
- Optimized GPU-based ML inference workloads on **AWS SageMaker, Kubernetes, and NVIDIA A10G nodes**, reducing **P99 latency by 24%** for recommendation systems handling **5M+ daily requests**.
- Integrated DevSecOps pipelines using **GitHub Actions, Trivy, and Open Policy Agent (OPA)**, enforcing **SOC 2** compliance and preventing non-compliant container deployments.
- Developed AI-driven anomaly detection systems using **Python, TensorFlow, and scikit-learn** across 200+ microservices, reducing **MTTR by 32%**.
- Built observability and FinOps dashboards with **Prometheus, Grafana, and AWS CloudWatch**, monitoring SLIs/SLOs, GPU utilization, and cloud spend, identifying **$180K+ annual savings**.
- Tuned **PostgreSQL (AWS RDS)** and **Redis (ElastiCache)** using PgBouncer, read replicas, and failover automation, reducing query latency by 28% with zero downtime.
- Automated Kubernetes autoscaling, GitOps workflows, and infrastructure provisioning using **ArgoCD, Helm, and Terraform**.

### 2. Uber &mdash; DevOps Engineer
*India | August 2020 &ndash; July 2023*
- Managed AWS cloud infrastructure and Kubernetes (Amazon EKS) environments supporting **300+ microservices**, ensuring **99.95% service availability** for large-scale rider and driver platforms.
- Automated infrastructure provisioning using **Terraform and AWS CloudFormation**, reducing manual deployment effort by **60%** and eliminating configuration drift across environments.
- Led migration of **15+ legacy applications to Kubernetes**, developing Helm charts, configuring Horizontal Pod Autoscaler (HPA), and optimizing CPU/memory utilization, reducing **EC2 costs by 28%**.
- Designed and optimized CI/CD pipelines using **Jenkins and GitLab CI/CD**, integrating automated testing, security scanning, and deployment validation with minimal rollback rates.
- Implemented centralized observability and monitoring using **Prometheus, Grafana, ELK Stack, and AWS CloudWatch** across 50+ production services.
- Strengthened DevSecOps and GitOps practices using **Trivy, ArgoCD, Kubernetes RBAC**, and policy enforcement.

---

## Core Technical Competencies

- **Cloud & Infrastructure**: AWS (EKS, EC2, S3, RDS, Lambda, SageMaker, IAM, CloudWatch, Auto Scaling, ElastiCache)
- **Infrastructure as Code & Automation**: Terraform, AWS CloudFormation, Ansible, Bash, Shell Scripting
- **Containers & Orchestration**: Docker, Kubernetes (EKS), Helm, ArgoCD, RBAC, Horizontal Pod Autoscaler (HPA), Node Group Scaling
- **CI/CD & DevSecOps**: GitHub Actions, Jenkins, GitLab CI/CD, AWS CodePipeline, Trivy, Open Policy Agent (OPA), SOC 2, PCI-DSS
- **MLOps & AI Systems**: AWS SageMaker, NVIDIA GPU Infrastructure (A10G), ML Inference Latency Optimization, TensorFlow, Scikit-learn, FastAPI
- **Observability & Reliability**: Prometheus, Grafana, ELK Stack, OpenTelemetry, PagerDuty, SLI/SLO Monitoring, FinOps, k6 Load Testing
- **Databases & Messaging**: PostgreSQL (RDS), Redis (ElastiCache), MySQL, Apache Kafka, PgBouncer

---

## Interactive Features

1. **Interactive DevOps CLI Terminal (`devops-cli`)**: Executable commands including `help`, `cat resume`, `terraform plan`, `kubectl get pods -A`, `docker ps`, `nexusml status`, `curl /metrics`, and `contact`.
2. **Interactive MLOps Decision Boundary Sandbox**: Real-time canvas visualizer rendering mathematical 2D classification decision boundaries across Moons, Circles, and Linear datasets with point-and-click inference latency testing.
3. **Automated Pipeline Lifecycle Architecture**: Visual flowchart tracing code commit through security gating, containerization, GitOps EKS deployment, and telemetry.
4. **Embedded PDF Resume Viewer**: Instant in-browser inspection and download of the complete resume PDF.

---

## Local Launch & Quickstart

```bash
git clone https://github.com/itachi-rdy79/portfolio.git
cd portfolio

# Static server options:
npx serve .
# or
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) to view the application.