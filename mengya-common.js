/**
 * 萌芽AI - 统一工具库
 * 提供导航、数据管理、通知等通用功能
 */

// 统一导航管理器
const NavigationManager = {
    // 智能返回 - 优先使用全局历史记录
    smartBack() {
        parent.postMessage({
            type: 'smartBack'
        }, '*');
    },
    
    // 导航到页面
    navigateTo(page, options = {}) {
        parent.postMessage({
            type: 'navigate',
            page: page,
            options: options
        }, '*');
    },
    
    // 添加页面切换动画
    addTransitionAnimation() {
        document.body.style.opacity = '0.8';
        document.body.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'scale(1)';
        }, 200);
    }
};

// 统一数据管理器
const DataManager = {
    // 设置数据
    setData(path, data) {
        parent.postMessage({
            type: 'setData',
            path: path,
            data: data
        }, '*');
    },
    
    // 获取数据 (异步)
    async getData(path) {
        return new Promise((resolve) => {
            const requestId = 'data_' + Date.now() + '_' + Math.random();
            
            // 监听响应
            const handleResponse = (event) => {
                if (event.data.type === 'dataResponse' && event.data.requestId === requestId) {
                    window.removeEventListener('message', handleResponse);
                    resolve(event.data.data);
                }
            };
            
            window.addEventListener('message', handleResponse);
            
            // 发送请求
            parent.postMessage({
                type: 'getData',
                path: path,
                requestId: requestId
            }, '*');
        });
    },
    
    // 同步数据
    syncData(force = false) {
        parent.postMessage({
            type: 'syncData',
            force: force
        }, '*');
    },
    
    // 本地存储辅助函数
    setLocal(key, value) {
        try {
            localStorage.setItem(`mengya_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('本地存储失败:', e);
        }
    },
    
    getLocal(key) {
        try {
            const value = localStorage.getItem(`mengya_${key}`);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.error('本地存储读取失败:', e);
            return null;
        }
    }
};

// 统一通知管理器
const NotificationManager = {
    show(message, type = 'info') {
        parent.postMessage({
            type: 'showNotification',
            message: message,
            notificationType: type
        }, '*');
    },
    
    success(message) {
        this.show(message, 'success');
    },
    
    error(message) {
        this.show(message, 'error');
    },
    
    warning(message) {
        this.show(message, 'warning');
    },
    
    info(message) {
        this.show(message, 'info');
    }
};

// 统一交互工具
const InteractionUtils = {
    // 震动反馈
    vibrate(pattern = [50]) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    },
    
    // 添加涟漪效果
    addRippleEffect(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },
    
    // 添加点击动画
    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }
};

// 页面生命周期管理
const PageLifecycle = {
    // 页面初始化
    onInit(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    },
    
    // 页面可见性变化
    onVisibilityChange(callback) {
        document.addEventListener('visibilitychange', callback);
    },
    
    // 页面卸载前
    onBeforeUnload(callback) {
        window.addEventListener('beforeunload', callback);
    },
    
    // 设置页面动画
    setupPageAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
};

// 常用页面配置
const PageConfigs = {
    // 儿童页面导航配置
    childPages: {
        'home': { title: '首页', icon: 'fas fa-home' },
        'learning-path': { title: '学习路径', icon: 'fas fa-road', back: 'home' },
        'ai-assistant': { title: 'AI助手', icon: 'fas fa-robot', back: 'home' },
        'story-wall': { title: '故事墙', icon: 'fas fa-book', back: 'home' },
        'badge-center': { title: '勋章中心', icon: 'fas fa-trophy', back: 'profile' },
        'evaluation': { title: '能力评估', icon: 'fas fa-chart-bar', back: 'profile' },
        'profile': { title: '个人中心', icon: 'fas fa-user', back: 'home' },
        'profile-edit': { title: '编辑资料', icon: 'fas fa-edit', back: 'profile' },
        'settings': { title: '设置', icon: 'fas fa-cog', back: 'profile' },
        'task-detail': { title: '任务详情', icon: 'fas fa-tasks', back: 'learning-path' },
        'report-detail': { title: '任务报告', icon: 'fas fa-file-alt', back: 'learning-path' }
    },
    
    // 家长页面导航配置
    parentPages: {
        'parent-auth': { title: '家长验证', icon: 'fas fa-shield-alt', back: 'home' },
        'parent-mode': { title: '家长模式', icon: 'fas fa-user-shield', back: 'home' },
        'parent-panel': { title: '家长控制面板', icon: 'fas fa-tachometer-alt', back: 'parent-mode' },
        'parent-ai': { title: 'AI分析报告', icon: 'fas fa-brain', back: 'parent-panel' },
        'parent-community': { title: '家长社区', icon: 'fas fa-users', back: 'parent-panel' },
        'parent-child-task': { title: '亲子任务', icon: 'fas fa-heart', back: 'parent-panel' }
    },
    
    // 获取页面配置
    getPageConfig(pageName) {
        return this.childPages[pageName] || this.parentPages[pageName] || { 
            title: '未知页面', 
            icon: 'fas fa-question', 
            back: 'home' 
        };
    }
};

// 全局暴露工具函数
window.MengyaUtils = {
    Navigation: NavigationManager,
    Data: DataManager,
    Notification: NotificationManager,
    Interaction: InteractionUtils,
    Lifecycle: PageLifecycle,
    PageConfigs: PageConfigs
};

// 兼容性别名
window.navigateToPage = NavigationManager.navigateTo;
window.navigateBack = NavigationManager.smartBack;
window.showNotification = NotificationManager.show;
window.vibrateDevice = InteractionUtils.vibrate;

// 自动设置页面动画
PageLifecycle.onInit(() => {
    PageLifecycle.setupPageAnimations();
});

// 添加全局CSS样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    [data-animate] {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
`;
document.head.appendChild(style);

// 萌芽AI统一工具库已加载 