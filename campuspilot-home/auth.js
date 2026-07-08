function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

function switchTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authTab === tab);
  });
  document.querySelector("#loginForm").classList.toggle("active", tab === "login");
  document.querySelector("#registerForm").classList.toggle("active", tab === "register");
}

function switchRoleSlide(index) {
  document.querySelectorAll("[data-auth-role-slide]").forEach((slide) => {
    slide.classList.toggle("active", Number(slide.dataset.authRoleSlide) === index);
  });
  document.querySelectorAll("[data-auth-role-dot]").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.authRoleDot) === index);
  });
}

function saveUser(user) {
  localStorage.setItem("campuspilot:user", JSON.stringify(user));
}

async function postAuth(path, body, fallbackUser) {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const result = await response.json();
    return result.user || fallbackUser;
  } catch {
    return fallbackUser;
  }
}

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.authTab));
});

let activeRoleSlide = 0;
const roleSlideCount = document.querySelectorAll("[data-auth-role-slide]").length;
let roleSlideTimer;

function startRoleSlideTimer() {
  window.clearInterval(roleSlideTimer);
  if (roleSlideCount <= 1) return;
  roleSlideTimer = window.setInterval(() => {
    activeRoleSlide = (activeRoleSlide + 1) % roleSlideCount;
    switchRoleSlide(activeRoleSlide);
  }, 4200);
}

startRoleSlideTimer();

document.querySelectorAll("[data-auth-role-dot]").forEach((button) => {
  button.addEventListener("click", () => {
    activeRoleSlide = Number(button.dataset.authRoleDot);
    switchRoleSlide(activeRoleSlide);
    startRoleSlideTimer();
  });
});

document.querySelectorAll("[data-auth-role-login]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    switchTab("login");
    document.querySelector("#loginForm select[name='role']").value = link.dataset.authRoleLogin;
    showToast(`已切换到${link.dataset.authRoleLogin}登录`);
  });
});

if (window.location.hash === "#register") {
  switchTab("register");
}

document.querySelector("#loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const role = event.currentTarget.role.value;
  const defaultName = { 学生: "张明远", 辅导员: "王老师", 导师: "陈导师", 学院管理者: "学院管理者" }[role] || "王老师";
  const defaultHome = { 学生: "student-home", 辅导员: "counselor-home", 导师: "teacher-home", 学院管理者: "admin-home" }[role] || "counselor-home";
  const fallbackUser = {
    name: defaultName,
    role,
    email: event.currentTarget.account.value,
    college: "信息工程学院",
    tenant: "CampusPilot 校园租户",
  };
  const user = await postAuth("/api/campuspilot/auth/login", { account: event.currentTarget.account.value, role, name: defaultName }, fallbackUser);
  saveUser(user);
  showToast("登录成功，正在进入工作台");
  window.setTimeout(() => {
    window.location.href = `./index.html#${defaultHome}`;
  }, 500);
});

document.querySelector("#registerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const fallbackUser = {
    name: form.name.value || "校园用户",
    role: form.role.value,
    email: form.email.value || "demo@campus.edu",
    college: "信息工程学院",
    tenant: "CampusPilot 校园租户",
  };
  const user = await postAuth("/api/campuspilot/auth/register", { name: form.name.value, email: form.email.value, role: form.role.value }, fallbackUser);
  saveUser(user);
  showToast("账号已创建");
  window.setTimeout(() => {
    const defaultHome = { 学生: "student-home", 辅导员: "counselor-home", 导师: "teacher-home", 学院管理者: "admin-home" }[user.role] || "user";
    window.location.href = `./index.html#${defaultHome}`;
  }, 500);
});

document.querySelector("#forgotButton").addEventListener("click", () => {
  showToast("已预留找回密码接口：/api/auth/password-reset");
});
