/**
 * Portfolio Interactive Core Engine
 * Chimalamarri Purna Lokesh Reddy (itachi-rdy79)
 * Cloud, DevOps & MLOps Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTerminal();
  initMLSandbox();
  initProjectFilter();
  initResumeModal();
  initCopyEmail();
  initScrollSpy();
});

/* =========================================================================
   1. Interactive Terminal Simulator (devops-cli)
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
  <span class="output-emerald">cat resume</span>         Print formatted curriculum vitae & credentials
  <span class="output-emerald">terraform plan</span>     Simulate AWS VPC, ECS Fargate & ALB infrastructure plan
  <span class="output-emerald">kubectl get pods</span>   Inspect Kubernetes cluster pods & orchestration
  <span class="output-emerald">docker ps</span>          View active production container workloads
  <span class="output-emerald">nexusml status</span>     Check MLOps inference engine and drift monitoring
  <span class="output-emerald">curl /metrics</span>      Scrape live Prometheus telemetry metrics
  <span class="output-emerald">contact</span>            Display direct contact channels
  <span class="output-emerald">clear</span>              Clear terminal buffer
`,

    'cat resume': () => `
<span class="output-cyan">===============================================================</span>
<span class="output-emerald">CHIMALAMARRI PURNA LOKESH REDDY &mdash; Cloud & MLOps Engineer</span>
<span class="output-cyan">===============================================================</span>
<strong>Email:</strong>    purnalokesh79@gmail.com | <strong>Phone:</strong> +91 7993652001
<strong>GitHub:</strong>   https://github.com/itachi-rdy79
<strong>Location:</strong> Guntur, AP, India (USA Master's Aspirant)

<span class="output-amber">ACADEMIC BACKGROUND:</span>
  &bull; <strong>B.Tech in Information Technology</strong> (2019 - 2023)
    Tirumala Engineering College, JNTUK | CGPA: 7.5
  &bull; <strong>Intermediate (MPC)</strong> - Sri Chaitanya Jr College | CGPA: 9.76
  &bull; <strong>SSC</strong> - Scholars High School | CGPA: 10.0

<span class="output-amber">EXPERIENCE & CERTIFICATIONS:</span>
  &bull; Software Engineering Virtual Experience &mdash; JPMorgan Chase & Co.
  &bull; Ethical Hacking Certification &mdash; IIT Kharagpur
  &bull; Python Programming Certification &mdash; APSSDC

<span class="output-amber">CORE SPECIALIZATIONS:</span>
  &bull; <strong>Cloud / DevOps:</strong> AWS (ECS, ECR, VPC, ALB), Terraform, Docker, Kubernetes HPA
  &bull; <strong>MLOps:</strong> Scikit-Learn Pipelines, Vector SVD Projections, FastAPI, Drift Detection
  &bull; <strong>Observability:</strong> Prometheus Telemetry, Grafana, k6 Concurrency Testing
`,

    'terraform plan': () => `
<span class="output-cyan">Acquiring state lock from DynamoDB table 'terraform-locks'...</span>
Refreshing Terraform state in-memory prior to plan...
aws_vpc.nexusml_vpc: Refreshing state... [id=vpc-0a89f2d01]
aws_subnet.private_1: Refreshing state... [id=subnet-04e8b3]
aws_ecs_cluster.production: Refreshing state... [id=arn:aws:ecs:us-east-1:148711:cluster/nexusml]

<span class="output-emerald">Terraform will perform the following actions:</span>

  # aws_ecs_service.nexusml_api will be updated in-place
  ~ resource "aws_ecs_service" "nexusml_api" {
      ~ desired_count                      = 2 -> 4
      ~ task_definition                    = "arn:aws:ecs:task:nexusml-api:14" -> "arn:aws:ecs:task:nexusml-api:15"
    }

  # aws_lb_listener_rule.api_routing will be verified
  + resource "aws_lb_listener_rule" "api_routing" {
      + priority     = 100
      + action {
          + type             = "forward"
          + target_group_arn = "arn:aws:elasticloadbalancing:tg/nexusml-api/7f3a"
        }
    }

<span class="output-emerald">Plan:</span> 1 to add, 1 to change, 0 to destroy.
<span class="output-cyan">Releasing state lock... Done in 1.48s.</span>
`,

    'kubectl get pods': () => `
<span class="output-cyan">NAMESPACE         NAME                              READY   STATUS    RESTARTS   AGE</span>
nexusml-system    nexusml-api-7c8db4b49b-7x89q      1/1     Running   0          4d12h
nexusml-system    nexusml-api-7c8db4b49b-m4k2p      1/1     Running   0          4d12h
nexusml-system    nexusml-api-7c8db4b49b-z92lj      1/1     Running   0          2h15m (HPA)
nexusml-system    nexusml-web-698dfbb4c-k9w8r       1/1     Running   0          4d12h
monitoring        prometheus-server-5d6cfc55-b7vpl  1/1     Running   0          6d04h
monitoring        grafana-core-8449c7f66b-4l92z     1/1     Running   0          6d04h
`,

    'kubectl get pods -A': () => COMMANDS['kubectl get pods'](),

    'docker ps': () => `
<span class="output-cyan">CONTAINER ID   IMAGE                          COMMAND                  CREATED        STATUS                    PORTS                    NAMES</span>
7f3a9e210d5c   itachi/nexusml-api:v2.4.0      "uvicorn api.main:..."   2 days ago     Up 2 days (healthy)       0.0.0.0:8000->8000/tcp   nexusml-api
3b9c412f8e10   itachi/nexusml-web:v2.4.0      "/docker-entrypoint..."  2 days ago     Up 2 days                 0.0.0.0:3000->80/tcp     nexusml-web
a84e2719c3b8   prom/prometheus:v2.50.0        "/bin/prometheus --..."  4 days ago     Up 4 days                 0.0.0.0:9090->9090/tcp   nexusml-prometheus
`,

    'nexusml status': () => `
<span class="output-emerald">[OK] NexusML Core Pipeline: ACTIVE</span>
  &bull; Model Serving: <strong>FastAPI / Uvicorn</strong> (Production)
  &bull; Loaded Classifiers: LogisticRegression (Linear), RandomForest (Moons), NeuralNet (Circles)
  &bull; Decision Boundary Resolution: 200x200 Coordinate Tensor Mesh
  &bull; Vector Engine: SVD 2D Latent Projections + Cosine Similarity
  &bull; Drift Detection Gate: Passed (KS-Statistic p-val: 0.84 > 0.05)
  &bull; Telemetry: Prometheus Scraper at <code>/metrics</code>
`,

    'curl /metrics': () => `
# HELP nexusml_predictions_total Total cumulative model prediction requests
# TYPE nexusml_predictions_total counter
nexusml_predictions_total{dataset="moons",model="random_forest"} 1428.0
nexusml_predictions_total{dataset="circles",model="neural_net"} 3894.0

# HELP nexusml_inference_duration_seconds Latency of model predictions
# TYPE nexusml_inference_duration_seconds histogram
nexusml_inference_duration_seconds_bucket{le="0.005"} 4120
nexusml_inference_duration_seconds_bucket{le="0.010"} 5210
nexusml_inference_duration_seconds_sum 18.42
nexusml_inference_duration_seconds_count 5322

# HELP nexusml_active_models Number of serialized models in memory
# TYPE nexusml_active_models gauge
nexusml_active_models 3.0
`,

    contact: () => `
<span class="output-cyan">Get in Touch with Chimalamarri Purna Lokesh Reddy:</span>
  &bull; <strong>Email:</strong>     <a href="mailto:purnalokesh79@gmail.com" style="color:var(--cyan)">purnalokesh79@gmail.com</a>
  &bull; <strong>Phone:</strong>     <a href="tel:+917993652001" style="color:var(--emerald)">+91 7993652001</a>
  &bull; <strong>GitHub:</strong>    <a href="https://github.com/itachi-rdy79" target="_blank" style="color:var(--violet)">github.com/itachi-rdy79</a>
  &bull; <strong>LinkedIn:</strong>  Available upon request
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
    echoLine.innerHTML = `<span class="prompt">lokesh@nexus:~$</span> <span class="cmd-text">${escapeHtml(trimmed)}</span>`;
    terminalOutput.appendChild(echoLine);

    if (trimmed.toLowerCase() === 'clear') {
      terminalOutput.innerHTML = '';
      appendInputRow();
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'cmd-output';

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
        <span class="prompt">lokesh@nexus:~$</span>
        <input type="text" id="terminalInput" class="terminal-input" placeholder="Type a command (e.g. cat resume, help, kubectl)..." autocomplete="off" spellcheck="false">
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
   2. Interactive MLOps Decision Boundary Sandbox
   ========================================================================= */
function initMLSandbox() {
  const canvas = document.getElementById('decisionBoundaryCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let currentDataset = 'moons';
  let currentModel = 'neural_net';
  let points = [];
  let clickedPoint = null;

  const datasetBtns = document.querySelectorAll('.dataset-btn');
  const modelBtns = document.querySelectorAll('.model-btn');
  const accuracyEl = document.getElementById('metricAccuracy');
  const latencyEl = document.getElementById('metricLatency');
  const resultBadge = document.getElementById('inferenceResultBadge');

  const MODEL_METRICS = {
    moons: {
      neural_net: { acc: '98.4%', lat: '3.8 ms' },
      random_forest: { acc: '96.2%', lat: '4.9 ms' },
      logistic: { acc: '82.0%', lat: '1.2 ms' }
    },
    circles: {
      neural_net: { acc: '99.1%', lat: '4.1 ms' },
      random_forest: { acc: '95.5%', lat: '5.2 ms' },
      logistic: { acc: '54.0%', lat: '1.1 ms' }
    },
    linear: {
      neural_net: { acc: '99.5%', lat: '3.6 ms' },
      random_forest: { acc: '97.8%', lat: '4.5 ms' },
      logistic: { acc: '99.0%', lat: '1.0 ms' }
    }
  };

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 380 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    generateDataset(currentDataset);
    render();
  }

  function generateDataset(type) {
    points = [];
    const count = 120;
    const w = canvas.getBoundingClientRect().width;
    const h = 380;
    const cx = w / 2;
    const cy = h / 2;

    if (type === 'moons') {
      for (let i = 0; i < count; i++) {
        const theta = Math.PI * (i / (count / 2));
        const r = 90 + (Math.random() - 0.5) * 22;
        if (i < count / 2) {
          const x = cx - 50 + r * Math.cos(theta);
          const y = cy - 20 - r * Math.sin(theta);
          points.push({ x, y, label: 0 });
        } else {
          const x = cx + 50 - r * Math.cos(theta);
          const y = cy + 20 + r * Math.sin(theta);
          points.push({ x, y, label: 1 });
        }
      }
    } else if (type === 'circles') {
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        if (i < count / 2) {
          const r = 40 + Math.random() * 25;
          points.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), label: 0 });
        } else {
          const r = 110 + Math.random() * 35;
          points.push({ x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta), label: 1 });
        }
      }
    } else {
      // Linear
      for (let i = 0; i < count; i++) {
        if (i < count / 2) {
          const x = cx - 70 + (Math.random() - 0.5) * 140;
          const y = cy - 60 + (Math.random() - 0.5) * 100;
          points.push({ x, y, label: 0 });
        } else {
          const x = cx + 70 + (Math.random() - 0.5) * 140;
          const y = cy + 60 + (Math.random() - 0.5) * 100;
          points.push({ x, y, label: 1 });
        }
      }
    }
  }

  function predictPoint(x, y) {
    const w = canvas.getBoundingClientRect().width;
    const h = 380;
    const cx = w / 2;
    const cy = h / 2;
    const dx = (x - cx) / 100;
    const dy = (y - cy) / 100;

    let prob = 0.5;

    if (currentDataset === 'circles') {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (currentModel === 'logistic') {
        prob = 1 / (1 + Math.exp(-(dx * 0.2 + dy * 0.2)));
      } else if (currentModel === 'random_forest') {
        prob = (Math.abs(dx) > 0.8 || Math.abs(dy) > 0.8) ? 0.95 : 0.05;
      } else {
        // Neural net
        prob = 1 / (1 + Math.exp(-((dist - 0.8) * 8)));
      }
    } else if (currentDataset === 'moons') {
      if (currentModel === 'logistic') {
        prob = 1 / (1 + Math.exp(-(dx * 1.5 - dy * 0.8)));
      } else if (currentModel === 'random_forest') {
        const val = (dy > 0 ? (dx > 0.2 ? 0.9 : 0.1) : (dx < -0.2 ? 0.1 : 0.9));
        prob = val;
      } else {
        // Neural net smooth sigmoid non-linear curve
        const wave = Math.sin(dx * 1.8) * 0.6;
        prob = 1 / (1 + Math.exp(-((dy - wave) * 6)));
      }
    } else {
      // Linear
      const val = dx * 1.4 + dy * 1.2;
      prob = 1 / (1 + Math.exp(-(val * 4)));
    }

    return Math.max(0.01, Math.min(0.99, prob));
  }

  function render() {
    const w = canvas.getBoundingClientRect().width;
    const h = 380;
    ctx.clearRect(0, 0, w, h);

    // 1. Draw Decision Boundary Mesh Field
    const step = 8;
    for (let x = 0; x < w; x += step) {
      for (let y = 0; y < h; y += step) {
        const prob = predictPoint(x + step / 2, y + step / 2);
        if (prob > 0.5) {
          // Class 1: Cyan / Violet
          const alpha = (prob - 0.5) * 0.45;
          ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        } else {
          // Class 0: Rose / Amber
          const alpha = (0.5 - prob) * 0.45;
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha})`;
        }
        ctx.fillRect(x, y, step, step);
      }
    }

    // 2. Draw Subtle Coordinate Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // 3. Draw Dataset Points
    points.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      if (pt.label === 1) {
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // 4. Draw Clicked Test Point
    if (clickedPoint) {
      ctx.beginPath();
      ctx.arc(clickedPoint.x, clickedPoint.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = clickedPoint.pred === 1 ? '#00f0ff' : '#f43f5e';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  function updateMetrics() {
    const data = MODEL_METRICS[currentDataset][currentModel];
    if (accuracyEl) accuracyEl.textContent = data.acc;
    if (latencyEl) latencyEl.textContent = data.lat;
  }

  // Event Listeners
  datasetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      datasetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDataset = btn.getAttribute('data-dataset');
      generateDataset(currentDataset);
      clickedPoint = null;
      updateMetrics();
      render();
    });
  });

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentModel = btn.getAttribute('data-model');
      updateMetrics();
      render();
    });
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const prob = predictPoint(x, y);
    const pred = prob >= 0.5 ? 1 : 0;
    const conf = (pred === 1 ? prob : (1 - prob)) * 100;

    clickedPoint = { x, y, pred, conf };
    render();

    if (resultBadge) {
      const className = pred === 1 ? 'Class 1 (Cyan Cluster)' : 'Class 0 (Rose Cluster)';
      const color = pred === 1 ? 'var(--cyan)' : 'var(--rose)';
      resultBadge.innerHTML = `
        <span style="color:${color}; font-weight:700;">Prediction: ${className}</span> | 
        <span>Confidence: ${conf.toFixed(1)}%</span> | 
        <span style="color:var(--emerald);">Latency: 3.4ms</span>
      `;
    }
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  updateMetrics();
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
    document.getElementById('footerResumeBtn')
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
   6. Active Navigation ScrollSpy
   ========================================================================= */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 200;

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
  });
}
