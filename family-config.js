// 家庭互动中心配置文件
class FamilyConfig {
    constructor() {
        this.defaultData = this.getDefaultData();
        this.activityTemplates = this.getActivityTemplates();
        this.gameTemplates = this.getGameTemplates();
    }

    // 获取默认家庭数据
    getDefaultData() {
        return {
            members: [
                { 
                    id: 'parent1', 
                    name: '爸爸', 
                    avatar: '👨', 
                    role: 'parent', 
                    status: 'online', 
                    score: 320, 
                    todayActivities: 2,
                    preferences: ['educational', 'creative']
                },
                { 
                    id: 'parent2', 
                    name: '妈妈', 
                    avatar: '👩', 
                    role: 'parent', 
                    status: 'online', 
                    score: 280, 
                    todayActivities: 3,
                    preferences: ['creative', 'social']
                },
                { 
                    id: 'child1', 
                    name: '小明', 
                    avatar: '👦', 
                    role: 'child', 
                    status: 'learning', 
                    score: 150, 
                    todayActivities: 1,
                    preferences: ['creative', 'games']
                }
            ],
            stats: {
                activities: 3,
                score: 150,
                interactionTime: 45,
                completionRate: 92
            },
            schedule: [
                { time: '09:00', activity: '晨读时光', participants: ['妈妈', '小明'], status: 'completed' },
                { time: '14:00', activity: '数学练习', participants: ['爸爸', '小明'], status: 'current' },
                { time: '16:00', activity: '创意画画', participants: ['全家'], status: 'pending' },
                { time: '19:00', activity: '故事分享', participants: ['全家'], status: 'pending' }
            ],
            messages: [
                { sender: '妈妈', message: '小明今天表现很棒！', time: '10分钟前', type: 'text' },
                { sender: '爸爸', message: '下午我们一起做数学题吧', time: '30分钟前', type: 'text' },
                { sender: '小明', message: '我想画一幅全家福', time: '1小时前', type: 'voice' }
            ]
        };
    }

    // 活动模板
    getActivityTemplates() {
        return [
            {
                id: 'story_creation',
                name: '创意故事时光',
                type: 'creative',
                icon: '📚',
                duration: 20,
                difficulty: 'easy',
                description: '和孩子一起创作奇妙的故事，培养想象力',
                participants: ['parent', 'child']
            },
            {
                id: 'math_games',
                name: '数学游戏大闯关',
                type: 'educational',
                icon: '🧮',
                duration: 25,
                difficulty: 'medium',
                description: '通过有趣的数学游戏提升逻辑思维',
                participants: ['parent', 'child']
            },
            {
                id: 'art_creation',
                name: '亲子艺术创作',
                type: 'creative',
                icon: '🎨',
                duration: 30,
                difficulty: 'easy',
                description: '一起创作美丽的艺术作品',
                participants: ['family']
            },
            {
                id: 'science_experiment',
                name: '科学小实验',
                type: 'educational',
                icon: '🔬',
                duration: 35,
                difficulty: 'medium',
                description: '通过简单实验探索科学奥秘',
                participants: ['parent', 'child']
            }
        ];
    }

    // 游戏模板
    getGameTemplates() {
        return [
            {
                id: 'word_chain',
                name: '词汇接龙',
                icon: '🔤',
                description: '锻炼词汇量和反应能力',
                type: 'word'
            },
            {
                id: 'quick_math',
                name: '快速计算',
                icon: '🧮',
                description: '提升数学计算能力',
                type: 'math'
            },
            {
                id: 'memory_training',
                name: '记忆训练',
                icon: '🧠',
                description: '增强记忆力和专注力',
                type: 'memory'
            },
            {
                id: 'draw_guess',
                name: '你画我猜',
                icon: '🎨',
                description: '发挥创意和想象力',
                type: 'draw'
            }
        ];
    }

    // 获取问候语
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return {
                greeting: "早安！美好的一天从学习开始",
                motivation: "今天要一起完成什么有趣的活动呢？"
            };
        } else if (hour < 18) {
            return {
                greeting: "下午好！继续我们的学习之旅",
                motivation: "午后时光最适合亲子互动了"
            };
        } else {
            return {
                greeting: "晚上好！温馨的家庭时光",
                motivation: "今天的学习成果让我们一起回顾吧"
            };
        }
    }

    // 获取天气信息
    getWeatherInfo() {
        const weathers = ['☀️ 晴天 22°C', '⛅ 多云 20°C', '🌧️ 小雨 18°C'];
        const moods = ['快乐愉悦', '轻松惬意', '温馨舒适'];
        
        return {
            weather: weathers[Math.floor(Math.random() * weathers.length)],
            mood: moods[Math.floor(Math.random() * moods.length)]
        };
    }

    // 获取活动推荐
    getRecommendations(memberPreferences = []) {
        const activities = this.activityTemplates;
        const currentHour = new Date().getHours();
        
        // 根据时间和偏好筛选
        return activities.filter(activity => {
            // 简单的时间适配
            if (currentHour < 12 && activity.type === 'creative') return true;
            if (currentHour >= 12 && currentHour < 18) return true;
            if (currentHour >= 18 && activity.type !== 'educational') return true;
            return false;
        }).slice(0, 3);
    }

    // 格式化时间
    formatTimeAgo(minutes) {
        if (minutes < 60) return `${minutes}分钟前`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}小时前`;
        const days = Math.floor(hours / 24);
        return `${days}天前`;
    }

    // 生成随机积分
    getRandomScore() {
        return Math.floor(Math.random() * 20) + 10;
    }

    // 获取状态颜色
    getStatusColor(status) {
        const colors = {
            online: 'bg-green-100 text-green-600',
            learning: 'bg-blue-100 text-blue-600',
            busy: 'bg-yellow-100 text-yellow-600',
            offline: 'bg-gray-100 text-gray-600'
        };
        return colors[status] || colors.offline;
    }

    // 获取状态文本
    getStatusText(status) {
        const texts = {
            online: '在线',
            learning: '学习中',
            busy: '忙碌',
            offline: '离线'
        };
        return texts[status] || '离线';
    }
}

// 创建全局配置实例
window.familyConfig = new FamilyConfig(); 