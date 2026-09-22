/**
 * Liquid Glass Core Workstation Engine
 * Purna Lokesh Reddy (itachi-rdy79)
 * DevOps Engineer (AI & ML) | Cincinnati, OH
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initLiquidBackground();
  initTerminal();
  initProjectFilter();
  initResumeModal();
  initCopyEmail();
  initScrollSpy();
});

/* =========================================================================
   1. Ambient Liquid Shader Canvas Engine
   ========================================================================= */
function initLiquidBackground() {
  const canvas = document.getElementById('liquidBgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;

  // Liquid Blobs
  const blobs = [
    { x: width * 0.15, y: height * 0.25, r: 240, color: 'rgba(0, 240, 255, 0.16)', vx: 0.4, vy: 0.3, phase: 0 },
    { x: width * 0.85, y: height * 0.40, r: 280, color: 'rgba(168, 85, 247, 0.15)', vx: -0.3, vy: 0.4, phase: 1.5 },
    { x: width * 0.50, y: height * 0.80, r: 260, color: 'rgba(16, 185, 129, 0.12)', vx: 0.35, vy: -0.25, phase: 3.0 },
    { x: width * 0.70, y: height * 0.15, r: 190, color: 'rgba(56, 189, 248, 0.12)', vx: -0.25, vy: 0.3, phase: 4.5 }
  ];

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    blobs.forEach((b) => {
      b.phase += 0.015;
      b.x += b.vx + Math.sin(b.phase) * 0.8;
      b.y += b.vy + Math.cos(b.phase) * 0.8;

      // Wrap edges
      if (b.x < -b.r) b.x = width + b.r;
      if (b.x > width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = height + b.r;
      if (b.y > height + b.r) b.y = -b.r;

      // Mouse subtle gravitational pull
      const dx = mouseX - b.x;
      const dy = mouseY - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 400) {
        b.x += (dx / dist) * 0.6;
        b.y += (dy / dist) * 0.6;
      }

      // Draw Radial Liquid Gradient Blob
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(0.5, b.color.replace(/[\d\.]+\)$/, '0.06)'));
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* =========================================================================
   2. Interactive Terminal Simulator (devops-cli)
   ========================================================================= */
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalChips = document.querySelectorAll('.terminal-chip');
  if (!terminalInput || !terminalOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<span class="output-cyan">Available System Commands:</span>
  <span class="output-emerald">help</span>               List all executable terminal commands
  <span class="output-emerald">whoami</span>             Display engineer bio, location & core summary
  <span class="output-emerald">cat resume</span>         Print complete curriculum vitae & work history
  <span class="output-emerald">terraform plan</span>     Simulate multi-region AWS EKS & SageMaker IaC plan
  <span class="output-emerald">kubectl get pods</span>   Inspect Kubernetes cluster pods (Shopify/Uber scale)
  <span class="output-emerald">eks scale &lt;N&gt;</span>       Scale simulated GPU inference pool (e.g. eks scale 4)
  <span class="output-emerald">docker ps</span>          View active production container workloads
  <span class="output-emerald">nexusml status</span>     Check MLOps inference engine and drift monitoring
  <span class="output-emerald">curl /metrics</span>      Scrape live Prometheus telemetry metrics
  <span class="output-emerald">contact</span>            Display direct contact channels (Cincinnati, OH)
  <span class="output-emerald">clear</span>              Clear terminal buffer
`,

    whoami: () => `
<span class="output-cyan">PURNA LOKESH REDDY</span>
DevOps Engineer (AI &amp; ML) &bull; Cincinnati, OH
Email:    <a href="mailto:purnalokesh79@gmail.com" style="color:var(--cyan)">purnalokesh79@gmail.com</a>
Phone:    <a href="tel:5135783720" style="color:var(--emerald)">513-578-3720</a>
GitHub:   <a href="https://github.com/itachi-rdy79" target="_blank" style="color:var(--violet)">github.com/itachi-rdy79</a>
Degree:   Master's in Information Technology (University of Cincinnati, Dec 2024)
`,

    'cat resume': () => `
<span class="output-cyan">===============================================================</span>
<span class="output-emerald">PURNA LOKESH REDDY &mdash; DevOps Engineer (AI & ML)</span>
<span class="output-cyan">===============================================================</span>
<strong>Location:</strong> Cincinnati, OH | <strong>Email:</strong> purnalokesh79@gmail.com | <strong>Phone:</strong> 513-578-3720
<strong>GitHub:</strong>   https://github.com/itachi-rdy79

<span class="output-amber">PROFESSIONAL EXPERIENCE:</span>

  <span class="output-cyan">&bull; Shopify | DevOps Engineer (AI & ML)</span> [Remote USA] (Aug 2024 &ndash; Present)
    &ndash; Engineered multi-region AWS EKS using Terraform, Helm & Ansible (99.97% uptime).
    &ndash; Optimized GPU inference on SageMaker & NVIDIA A10G, cutting P99 latency by 24% for 5M+ daily requests.
    &ndash; Built DevSecOps pipelines with GitHub Actions, Trivy & OPA for SOC 2 compliance.
    &ndash; Developed AI anomaly detection with TensorFlow/scikit-learn across 200+ services, reducing MTTR by 32%.
    &ndash; FinOps dashboards identified $180K+ in annual cloud savings.
    &ndash; Tuned PostgreSQL (RDS) & Redis with PgBouncer, cutting latency 28% with zero downtime.
    &ndash; Automated GitOps and autoscaling via ArgoCD, Helm, and Terraform.

  <span class="output-cyan">&bull; Uber | DevOps Engineer</span> [India] (Aug 2020 &ndash; July 2023)
    &ndash; Managed AWS cloud & Kubernetes (EKS) for 300+ microservices (99.95% service availability).
    &ndash; Automated infrastructure via Terraform & CloudFormation, reducing manual effort by 60%.
    &ndash; Migrated 15+ legacy apps to K8s with Helm & HPA, cutting EC2 costs by 28%.
    &ndash; Optimized CI/CD pipelines via Jenkins & GitLab CI/CD with automated security scanning.
    &ndash; Implemented centralized monitoring via Prometheus, Grafana, ELK Stack, and CloudWatch.

<span class="output-amber">EDUCATION:</span>
  &bull; <strong>Master's in Information Technology</strong> &mdash; University of Cincinnati, OH, USA (Graduated: Dec 12, 2024)

<span class="output-amber">TECHNICAL SKILLS:</span>
  &bull; <strong>Cloud & Infra:</strong> AWS (EKS, EC2, S3, RDS, Lambda, SageMaker, IAM, CloudWatch, Auto Scaling)
  &bull; <strong>IaC & Automation:</strong> Terraform, AWS CloudFormation, Ansible, Bash, Shell Scripting
  &bull; <strong>Containers & K8s:</strong> Docker, Kubernetes (EKS), Helm, ArgoCD, RBAC, HPA, Node Scaling
  &bull; <strong>CI/CD & DevSecOps:</strong> GitHub Actions, Jenkins, GitLab CI/CD, Trivy, OPA, SOC 2, PCI-DSS
  &bull; <strong>MLOps & AI:</strong> AWS SageMaker, NVIDIA A10G GPUs, Latency Optimization, TensorFlow, Scikit-learn
  &bull; <strong>Observability:</strong> Prometheus, Grafana, ELK Stack, OpenTelemetry, PagerDuty, FinOps
`,

    'terraform plan': () => `
<span class="output-cyan">Acquiring state lock from DynamoDB table 'terraform-locks'...</span>
Refreshing Terraform state in-memory prior to plan...
module.eks_cluster.aws_eks_cluster.this: Refreshing state... [id=shopify-production-eks]
module.gpu_nodes.aws_eks_node_group.a10g: Refreshing state... [id=eks-a10g-recommendations]
aws_sagemaker_endpoint.inference_v2: Refreshing state... [id=arn:aws:sagemaker:us-east-1:endpoint/v2]

<span class="output-emerald">Terraform will perform the following actions:</span>

  # module.gpu_nodes.aws_eks_node_group.a10g will be updated in-place
  ~ resource "aws_eks_node_group" "a10g" {
      ~ scaling_config {
          ~ max_size     = 10 -> 16 (Black Friday scale preparedness)
            min_size     = 2
            desired_size = 4
        }
    }

  # aws_security_group_rule.trivy_opa_egress will be created
  + resource "aws_security_group_rule" "trivy_opa_egress" {
      + type        = "egress"
      + from_port   = 443
      + to_port     = 443
      + protocol    = "tcp"
      + description = "Allow OPA bundle sync and Trivy vulnerability updates"
    }

<span class="output-emerald">Plan:</span> 1 to add, 1 to change, 0 to destroy.
<span class="output-cyan">Releasing state lock... Done in 1.22s.</span>
`,

    'kubectl get pods': () => `
<span class="output-cyan">NAMESPACE         NAME                              READY   STATUS    RESTARTS   AGE</span>
recommendations   inference-a10g-7c8db4b49b-7x89q   1/1     Running   0          42d
recommendations   inference-a10g-7c8db4b49b-m4k2p   1/1     Running   0          42d
recommendations   inference-a10g-7c8db4b49b-z92lj   1/1     Running   0          18m (HPA Scale)
aiops-anomaly     detector-engine-698dfbb4c-k9w8r   1/1     Running   0          19d
gitops-argocd     argocd-server-5d6cfc55-b7vpl      1/1     Running   0          68d
monitoring        prometheus-server-8449c7f66b-4l   1/1     Running   0          68d
monitoring        grafana-core-59b4c898d-j29xp      1/1     Running   0          68d
`,

    'kubectl get pods -A': () => COMMANDS['kubectl get pods'](),

    'docker ps': () => `
<span class="output-cyan">CONTAINER ID   IMAGE                               COMMAND                  CREATED        STATUS                    PORTS                    NAMES</span>
7f3a9e210d5c   shopify/ml-inference-a10g:v2.4      "python server.py --..." 2 weeks ago    Up 2 weeks (healthy)      0.0.0.0:8080->8080/tcp   inference-node
3b9c412f8e10   shopify/aiops-anomaly-detector:v1.8 "python -m aiops.run"    2 weeks ago    Up 2 weeks                0.0.0.0:5000->5000/tcp   anomaly-engine
a84e2719c3b8   prom/prometheus:v2.50.0             "/bin/prometheus --..."  4 weeks ago    Up 4 weeks                0.0.0.0:9090->9090/tcp   prometheus-master
`,

    'nexusml status': () => `
<span class="output-emerald">[OK] NexusML Production MLOps Stack: OPERATIONAL</span>
  &bull; Deployment Environment: <strong>AWS EKS Multi-Region</strong>
  &bull; Target Recommendation Latency: <strong>P99 &lt; 14ms (24% reduction achieved)</strong>
  &bull; Anomaly Detection Engine: Active across 200+ Microservices (MTTR -32%)
  &bull; DevSecOps Status: Passed (Trivy 0 Critical, OPA SOC 2 Enforced)
  &bull; Observability: Prometheus + CloudWatch + Grafana
`,

    'curl /metrics': () => `
# HELP sagemaker_inference_requests_total Total cumulative recommendation inference requests
# TYPE sagemaker_inference_requests_total counter
sagemaker_inference_requests_total{model="recommendation_v2",gpu="A10G"} 5241890.0

# HELP sagemaker_inference_latency_ms Histogram of inference duration in milliseconds
# TYPE sagemaker_inference_latency_ms histogram
sagemaker_inference_latency_ms_bucket{le="10"} 3948120
sagemaker_inference_latency_ms_bucket{le="20"} 5104810
sagemaker_inference_latency_ms_bucket{le="50"} 5241800
sagemaker_inference_latency_ms_sum 58491204.0
sagemaker_inference_latency_ms_count 5241890

# HELP finops_monthly_cloud_spend_dollars Cloud spend tracking metric
# TYPE finops_monthly_cloud_spend_dollars gauge
finops_monthly_cloud_spend_dollars{category="ec2_savings"} 15200.0
`,

    contact: () => `
<span class="output-cyan">Direct Contact Channels (Purna Lokesh Reddy):</span>
  &bull; <strong>Location:</strong> Cincinnati, OH, USA
  &bull; <strong>Email:</strong>    <a href="mailto:purnalokesh79@gmail.com" style="color:var(--cyan)">purnalokesh79@gmail.com</a>
  &bull; <strong>Phone:</strong>    <a href="tel:5135783720" style="color:var(--emerald)">513-578-3720</a>
  &bull; <strong>GitHub:</strong>   <a href="https://github.com/itachi-rdy79" target="_blank" style="color:var(--violet)">github.com/itachi-rdy79</a>
`
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    // Create command echo element
    const echoLine = document.createElement('div');
    echoLine.className = 'cmd-line';
    echoLine.innerHTML = `<span class="prompt">lokesh@cincinnati:~$</span> <span class="cmd-text">${escapeHtml(trimmed)}</span>`;
    terminalOutput.appendChild(echoLine);

    if (trimmed.toLowerCase() === 'clear') {
      terminalOutput.innerHTML = '';
      appendInputRow();
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'cmd-output';

    // Check for eks scale command
    if (trimmed.toLowerCase().startsWith('eks scale')) {
      const parts = trimmed.split(' ');
      const count = parseInt(parts[2], 10);
      if (!isNaN(count) && count >= 1 && count <= 16) {
        const p99 = (10 + 32 / Math.sqrt(count)).toFixed(1);
        outputLine.innerHTML = `<span class="output-emerald">[OK] Successfully scaled AWS EKS GPU node group to ${count} NVIDIA A10G instances. ${count * 4} inference replicas active (P99 ~ ${p99}ms).</span>`;
      } else {
        outputLine.innerHTML = `<span class="output-amber">Usage: eks scale &lt;1-16&gt;</span>`;
      }
      terminalOutput.appendChild(outputLine);
      appendInputRow();
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      return;
    }

    const handler = COMMANDS[trimmed.toLowerCase()];
    if (handler) {
      outputLine.innerHTML = handler();
    } else {
      outputLine.innerHTML = `<span class="output-amber">bash: command not found: ${escapeHtml(trimmed)}. Type 'help' to see valid commands.</span>`;
    }

    terminalOutput.appendChild(outputLine);
    appendInputRow();
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function appendInputRow() {
    let inputWrap = document.querySelector('.terminal-input-wrap');
    if (!inputWrap) {
      inputWrap = document.createElement('div');
      inputWrap.className = 'terminal-input-wrap';
      inputWrap.innerHTML = `
        <span class="prompt">lokesh@cincinnati:~$</span>
        <input type="text" id="terminalInput" class="terminal-input" placeholder="Type a command (cat resume, kubectl, terraform, help)..." autocomplete="off" spellcheck="false">
      `;
      terminalOutput.appendChild(inputWrap);
      attachInputListeners(inputWrap.querySelector('input'));
    } else {
      terminalOutput.appendChild(inputWrap);
      const input = inputWrap.querySelector('input');
      input.value = '';
      input.focus();
    }
  }

  function attachInputListeners(input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value;
        input.value = '';
        executeCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = input.value.trim().toLowerCase();
        const matches = Object.keys(COMMANDS).filter(cmd => cmd.startsWith(current));
        if (matches.length === 1) {
          input.value = matches[0];
        }
      }
    });
  }

  attachInputListeners(terminalInput);

  // Command chips
  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* =========================================================================
   3. Featured Projects Filter
   ========================================================================= */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================================
   4. Resume PDF Modal
   ========================================================================= */
function initResumeModal() {
  const openBtns = [
    document.getElementById('openResumeBtn'),
    document.getElementById('heroResumeBtn'),
    document.getElementById('footerResumeBtn'),
    document.getElementById('dockResumeBtn')
  ];
  const modal = document.getElementById('resumeModal');
  const closeBtn = document.getElementById('closeModalBtn');
  if (!modal) return;

  openBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* =========================================================================
   5. Copy Email Toast Notification
   ========================================================================= */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!copyBtn || !toast) return;

  copyBtn.addEventListener('click', () => {
    const email = 'purnalokesh79@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      if (toastMsg) toastMsg.textContent = `Copied ${email} to clipboard!`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  });
}

/* =========================================================================
   6. Active Navigation ScrollSpy & Dock Indicator
   ========================================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const dockItems = document.querySelectorAll('.dock-item[href]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    dockItems.forEach(item => {
      if (item.getAttribute('href') === `#${current}`) {
        item.style.borderColor = 'var(--cyan)';
        item.style.color = 'var(--cyan)';
        item.style.background = 'rgba(0, 240, 255, 0.15)';
      } else {
        item.style.borderColor = '';
        item.style.color = '';
        item.style.background = '';
      }
    });
  });
}
