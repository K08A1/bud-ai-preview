/**
 * 家庭互动配置管理系统
 * 管理家庭成员、活动配置、通知设置等
 */

class FamilyInteractionManager {
    constructor() {
        this.familyData = null;
        this.settings = null;
        this.eventListeners = new Map();
        this.init();
    }

    // 初始化家庭互动管理器
    async init() {
        try {
            await this.loadFamilyData();
            await this.loadSettings();
            this.setupEventListeners();
            // 家庭互动管理器初始化完成
        } catch (error) {
            console.error('家庭互动管理器初始化失败:', error);
            this.createDefaultFamily();
        }
    }

    // 加载家庭数据
    async loadFamilyData() {
        try {
            this.familyData = await MengyaUtils.Data.getData('family') || this.getDefaultFamilyData();
            return this.familyData;
        } catch (error) {
            console.error('加载家庭数据失败:', error);
            this.familyData = this.getDefaultFamilyData();
            return this.familyData;
        }
    }

    // 获取默认家庭数据
    getDefaultFamilyData() {
        return {
            id: 'family_' + Date.now(),
            name: '温馨之家',
            created: new Date().toISOString(),
            members: [
                {
                    id: 'parent1',
                    name: '爸爸',
                    avatar: '👨',
                    role: 'parent',
                    status: 'online',
                    preferences: {
                        activityTypes: ['educational', 'creative', 'logical'],
                        difficulty: 'medium',
                        timeSlots: ['morning', 'evening']
                    },
                    stats: {
                        totalScore: 320,
                        todayActivities: 2,
                        weeklyGoal: 10,
                        currentStreak: 5
                    }
                },
                {
                    id: 'parent2',
                    name: '妈妈',
                    avatar: '👩',
                    role: 'parent',
                    status: 'online',
                    preferences: {
                        activityTypes: ['creative', 'social', 'educational'],
                        difficulty: 'easy',
                        timeSlots: ['afternoon', 'evening']
                    },
                    stats: {
                        totalScore: 280,
                        todayActivities: 3,
                        weeklyGoal: 12,
                        currentStreak: 3
                    }
                },
                {
                    id: 'child1',
                    name: '小明',
                    avatar: '👦',
                    role: 'child',
                    status: 'learning',
                    age: 8,
                    grade: 2,
                    preferences: {
                        activityTypes: ['creative', 'games', 'stories'],
                        difficulty: 'easy',
                        timeSlots: ['afternoon', 'evening']
                    },
                    stats: {
                        totalScore: 150,
                        todayActivities: 1,
                        weeklyGoal: 8,
                        currentStreak: 7
                    },
                    abilities: {
                        creativity: 85,
                        expression: 78,
                        logic: 72,
                        focus: 82
                    }
                }
            ],
            stats: {
                totalActivities: 156,
                totalScore: 750,
                totalInteractionTime: 1250, // 分钟
                averageDaily: 4.2,
                currentLevel: 5,
                nextLevelScore: 1000
            },
            currentActivities: [],
            schedule: [
                {
                    id: 'schedule_1',
                    time: '09:00',
                    activity: '晨读时光',
                    type: 'reading',
                    participants: ['parent2', 'child1'],
                    status: 'completed',
                    recurring: 'daily'
                },
                {
                    id: 'schedule_2',
                    time: '14:00',
                    activity: '数学练习',
                    type: 'educational',
                    participants: ['parent1', 'child1'],
                    status: 'current',
                    recurring: 'weekdays'
                },
                {
                    id: 'schedule_3',
                    time: '16:00',
                    activity: '创意画画',
                    type: 'creative',
                    participants: ['parent1', 'parent2', 'child1'],
                    status: 'pending',
                    recurring: 'weekly'
                },
                {
                    id: 'schedule_4',
                    time: '19:00',
                    activity: '故事分享',
                    type: 'social',
                    participants: ['parent1', 'parent2', 'child1'],
                    status: 'pending',
                    recurring: 'daily'
                }
            ],
            communications: [
                {
                    id: 'msg_1',
                    sender: 'parent2',
                    message: '小明今天表现很棒！',
                    timestamp: Date.now() - 600000,
                    type: 'text',
                    reactions: ['❤️', '👏']
                },
                {
                    id: 'msg_2',
                    sender: 'parent1',
                    message: '下午我们一起做数学题吧',
                    timestamp: Date.now() - 1800000,
                    type: 'text',
                    reactions: ['👍']
                },
                {
                    id: 'msg_3',
                    sender: 'child1',
                    message: '我想画一幅全家福',
                    timestamp: Date.now() - 3600000,
                    type: 'voice',
                    duration: 3,
                    reactions: ['😊', '🎨']
                }
            ],
            achievements: [
                {
                    id: 'family_first_week',
                    name: '家庭学习第一周',
                    description: '完成连续一周的家庭学习活动',
                    icon: '🏆',
                    unlocked: true,
                    unlockedDate: '2024-01-15'
                },
                {
                    id: 'creative_masters',
                    name: '创意大师家庭',
                    description: '完成20个创意类活动',
                    icon: '🎨',
                    unlocked: true,
                    unlockedDate: '2024-01-20'
                },
                {
                    id: 'learning_streak_7',
                    name: '学习连击王',
                    description: '连续7天完成学习活动',
                    icon: '⚡',
                    unlocked: false,
                    progress: 5,
                    target: 7
                }
            ]
        };
    }

    // 加载设置
    async loadSettings() {
        try {
            this.settings = await MengyaUtils.Data.getData('family.settings') || this.getDefaultSettings();
            return this.settings;
        } catch (error) {
            console.error('加载家庭设置失败:', error);
            this.settings = this.getDefaultSettings();
            return this.settings;
        }
    }

    // 获取默认设置
    getDefaultSettings() {
        return {
            notifications: {
                enabled: true,
                activityReminders: true,
                achievementAlerts: true,
                familyMessages: true,
                sound: true,
                quietHours: {
                    enabled: true,
                    start: '22:00',
                    end: '07:00'
                }
            },
            privacy: {
                shareActivities: true,
                shareAchievements: true,
                allowInvitations: true,
                profileVisibility: 'family'
            },
            activities: {
                autoRecommend: true,
                difficultyAdjustment: 'adaptive',
                maxDailyActivities: 6,
                preferredDuration: 30, // 分钟
                allowedTypes: ['educational', 'creative', 'social', 'games', 'physical']
            },
            interface: {
                theme: 'family',
                language: 'zh-CN',
                animations: true,
                compactMode: false,
                showTips: true
            },
            parental: {
                contentFilter: 'moderate',
                timeRestrictions: {
                    weekdays: {
                        start: '07:00',
                        end: '20:00',
                        maxDuration: 120 // 分钟
                    },
                    weekends: {
                        start: '08:00',
                        end: '21:00',
                        maxDuration: 180 // 分钟
                    }
                },
                requireApproval: ['new_activities', 'friend_requests', 'content_sharing'],
                screenTime: {
                    enabled: true,
                    dailyLimit: 90, // 分钟
                    warningAt: 15 // 剩余分钟数
                }
            }
        };
    }

    // 创建默认家庭
    async createDefaultFamily() {
        this.familyData = this.getDefaultFamilyData();
        this.settings = this.getDefaultSettings();
        await this.saveFamilyData();
        await this.saveSettings();
                    // 创建默认家庭完成
    }

    // 保存家庭数据
    async saveFamilyData() {
        try {
            await MengyaUtils.Data.setData('family', this.familyData);
            return true;
        } catch (error) {
            console.error('保存家庭数据失败:', error);
            return false;
        }
    }

    // 保存设置
    async saveSettings() {
        try {
            await MengyaUtils.Data.setData('family.settings', this.settings);
            return true;
        } catch (error) {
            console.error('保存家庭设置失败:', error);
            return false;
        }
    }

    // 获取家庭成员
    getFamilyMembers() {
        return this.familyData ? this.familyData.members : [];
    }

    // 获取特定成员
    getMember(memberId) {
        return this.familyData?.members.find(member => member.id === memberId);
    }

    // 更新成员状态
    async updateMemberStatus(memberId, status) {
        const member = this.getMember(memberId);
        if (member) {
            member.status = status;
            member.lastActive = new Date().toISOString();
            await this.saveFamilyData();
            this.emitEvent('memberStatusChanged', { memberId, status });
            return true;
        }
        return false;
    }

    // 添加家庭成员
    async addFamilyMember(memberData) {
        if (!this.familyData) await this.loadFamilyData();
        
        const newMember = {
            id: 'member_' + Date.now(),
            name: memberData.name,
            avatar: memberData.avatar || '👤',
            role: memberData.role || 'child',
            status: 'offline',
            joinedDate: new Date().toISOString(),
            preferences: memberData.preferences || {},
            stats: {
                totalScore: 0,
                todayActivities: 0,
                weeklyGoal: memberData.role === 'child' ? 8 : 10,
                currentStreak: 0
            },
            ...memberData
        };

        this.familyData.members.push(newMember);
        await this.saveFamilyData();
        this.emitEvent('memberAdded', newMember);
        return newMember;
    }

    // 移除家庭成员
    async removeFamilyMember(memberId) {
        if (!this.familyData) return false;
        
        const index = this.familyData.members.findIndex(member => member.id === memberId);
        if (index > -1) {
            const removedMember = this.familyData.members.splice(index, 1)[0];
            await this.saveFamilyData();
            this.emitEvent('memberRemoved', removedMember);
            return true;
        }
        return false;
    }

    // 获取活动建议
    getActivityRecommendations(memberId = null) {
        const member = memberId ? this.getMember(memberId) : null;
        const currentHour = new Date().getHours();
        
        const baseRecommendations = [
            {
                id: 'story_time',
                name: '创意故事时光',
                type: 'creative',
                difficulty: 'easy',
                duration: 20,
                participants: ['parent', 'child'],
                timePreference: ['afternoon', 'evening'],
                description: '和孩子一起创作奇妙的故事，培养想象力和语言表达能力',
                icon: '📚'
            },
            {
                id: 'math_games',
                name: '数学游戏大闯关',
                type: 'educational',
                difficulty: 'medium',
                duration: 25,
                participants: ['parent', 'child'],
                timePreference: ['morning', 'afternoon'],
                description: '通过有趣的数学游戏提升逻辑思维和计算能力',
                icon: '🧮'
            },
            {
                id: 'art_creation',
                name: '亲子艺术创作',
                type: 'creative',
                difficulty: 'easy',
                duration: 30,
                participants: ['family'],
                timePreference: ['afternoon', 'evening'],
                description: '一起创作美丽的艺术作品，培养审美和创造力',
                icon: '🎨'
            },
            {
                id: 'science_experiment',
                name: '科学小实验',
                type: 'educational',
                difficulty: 'medium',
                duration: 35,
                participants: ['parent', 'child'],
                timePreference: ['afternoon'],
                description: '通过简单有趣的实验探索科学奥秘',
                icon: '🔬'
            },
            {
                id: 'music_rhythm',
                name: '音乐律动时间',
                type: 'creative',
                difficulty: 'easy',
                duration: 15,
                participants: ['family'],
                timePreference: ['morning', 'evening'],
                description: '通过音乐和舞蹈培养节奏感和音乐素养',
                icon: '🎵'
            }
        ];

        // 根据成员偏好和当前时间筛选推荐
        let recommendations = baseRecommendations;
        
        if (member) {
            recommendations = recommendations.filter(rec => 
                member.preferences.activityTypes?.includes(rec.type)
            );
        }

        // 根据时间偏好筛选
        const currentTimeSlot = currentHour < 12 ? 'morning' : 
                              currentHour < 18 ? 'afternoon' : 'evening';
        
        recommendations = recommendations.filter(rec => 
            rec.timePreference.includes(currentTimeSlot)
        );

        // 评分和排序
        return recommendations.map(rec => ({
            ...rec,
            score: this.calculateRecommendationScore(rec, member),
            reason: this.generateRecommendationReason(rec, member)
        })).sort((a, b) => b.score - a.score);
    }

    // 计算推荐分数
    calculateRecommendationScore(recommendation, member) {
        let score = 50; // 基础分数

        if (member) {
            // 根据偏好加分
            if (member.preferences.activityTypes?.includes(recommendation.type)) {
                score += 20;
            }
            
            // 根据能力水平调整
            if (member.abilities) {
                const relevantAbility = this.getRelevantAbility(recommendation.type, member.abilities);
                if (relevantAbility < 70) score += 15; // 提升弱项
                if (relevantAbility > 85) score += 10; // 发挥优势
            }
            
            // 根据活动频率调整
            const recentActivity = this.getRecentActivityCount(recommendation.type);
            if (recentActivity < 2) score += 10; // 缺少的活动类型
            if (recentActivity > 5) score -= 10; // 过多的活动类型
        }

        // 时间因素
        const currentHour = new Date().getHours();
        const timeSlot = currentHour < 12 ? 'morning' : 
                        currentHour < 18 ? 'afternoon' : 'evening';
        
        if (recommendation.timePreference.includes(timeSlot)) {
            score += 15;
        }

        return Math.max(0, Math.min(100, score));
    }

    // 生成推荐理由
    generateRecommendationReason(recommendation, member) {
        const reasons = [];
        
        if (member?.preferences.activityTypes?.includes(recommendation.type)) {
            reasons.push('符合兴趣偏好');
        }
        
        const currentHour = new Date().getHours();
        const timeSlot = currentHour < 12 ? 'morning' : 
                        currentHour < 18 ? 'afternoon' : 'evening';
        
        if (recommendation.timePreference.includes(timeSlot)) {
            reasons.push('适合当前时间');
        }
        
        if (member?.abilities) {
            const relevantAbility = this.getRelevantAbility(recommendation.type, member.abilities);
            if (relevantAbility < 70) {
                reasons.push('有助于能力提升');
            }
        }
        
        const recentActivity = this.getRecentActivityCount(recommendation.type);
        if (recentActivity < 2) {
            reasons.push('增加活动多样性');
        }

        return reasons.length > 0 ? reasons.join('，') : '适合家庭互动';
    }

    // 获取相关能力
    getRelevantAbility(activityType, abilities) {
        const abilityMap = {
            creative: 'creativity',
            educational: 'logic',
            social: 'expression',
            games: 'focus'
        };
        
        const abilityKey = abilityMap[activityType] || 'focus';
        return abilities[abilityKey] || 75;
    }

    // 获取最近活动数量
    getRecentActivityCount(activityType) {
        // 模拟数据，实际应该从历史记录中统计
        return Math.floor(Math.random() * 8);
    }

    // 添加通信消息
    async addMessage(senderId, message, type = 'text') {
        if (!this.familyData) await this.loadFamilyData();
        
        const newMessage = {
            id: 'msg_' + Date.now(),
            sender: senderId,
            message: message,
            timestamp: Date.now(),
            type: type,
            reactions: []
        };

        this.familyData.communications.unshift(newMessage);
        
        // 保持最新的50条消息
        if (this.familyData.communications.length > 50) {
            this.familyData.communications = this.familyData.communications.slice(0, 50);
        }

        await this.saveFamilyData();
        this.emitEvent('messageAdded', newMessage);
        return newMessage;
    }

    // 添加消息反应
    async addMessageReaction(messageId, reaction) {
        const message = this.familyData?.communications.find(msg => msg.id === messageId);
        if (message) {
            if (!message.reactions.includes(reaction)) {
                message.reactions.push(reaction);
                await this.saveFamilyData();
                this.emitEvent('reactionAdded', { messageId, reaction });
                return true;
            }
        }
        return false;
    }

    // 更新活动统计
    async updateActivityStats(activityData) {
        if (!this.familyData) await this.loadFamilyData();
        
        // 更新家庭总统计
        this.familyData.stats.totalActivities += 1;
        this.familyData.stats.totalScore += activityData.score || 0;
        this.familyData.stats.totalInteractionTime += activityData.duration || 0;
        
        // 更新参与成员的统计
        if (activityData.participants) {
            activityData.participants.forEach(memberId => {
                const member = this.getMember(memberId);
                if (member) {
                    member.stats.todayActivities += 1;
                    member.stats.totalScore += activityData.score || 0;
                    member.stats.currentStreak += 1;
                }
            });
        }

        await this.saveFamilyData();
        this.emitEvent('activityCompleted', activityData);
    }

    // 检查成就解锁
    async checkAchievements() {
        if (!this.familyData) return [];
        
        const newAchievements = [];
        
        // 检查各种成就条件
        for (const achievement of this.familyData.achievements) {
            if (!achievement.unlocked) {
                if (this.checkAchievementCondition(achievement)) {
                    achievement.unlocked = true;
                    achievement.unlockedDate = new Date().toISOString();
                    newAchievements.push(achievement);
                }
            }
        }

        if (newAchievements.length > 0) {
            await this.saveFamilyData();
            this.emitEvent('achievementsUnlocked', newAchievements);
        }

        return newAchievements;
    }

    // 检查成就条件
    checkAchievementCondition(achievement) {
        switch (achievement.id) {
            case 'learning_streak_7':
                const childMember = this.familyData.members.find(m => m.role === 'child');
                return childMember && childMember.stats.currentStreak >= 7;
            
            case 'family_activities_50':
                return this.familyData.stats.totalActivities >= 50;
            
            default:
                return false;
        }
    }

    // 事件系统
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emitEvent(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`事件处理错误 ${event}:`, error);
                }
            });
        }
    }

    // 设置事件监听器
    setupEventListeners() {
        // 监听数据变化
        this.on('memberStatusChanged', (data) => {
            // 成员状态变化
        });

        this.on('activityCompleted', (data) => {
            // 活动完成
            this.checkAchievements();
        });

        this.on('achievementsUnlocked', (achievements) => {
            // 新成就解锁
            // 显示成就通知
            achievements.forEach(achievement => {
                if (typeof MengyaUtils !== 'undefined') {
                    MengyaUtils.Notification.success(`🎉 恭喜解锁成就：${achievement.name}`);
                }
            });
        });
    }

    // 获取家庭等级信息
    getFamilyLevel() {
        const totalScore = this.familyData?.stats.totalScore || 0;
        const level = Math.floor(totalScore / 200) + 1;
        const currentLevelScore = totalScore % 200;
        const nextLevelScore = 200;
        const progress = (currentLevelScore / nextLevelScore) * 100;

        return {
            level,
            currentScore: totalScore,
            currentLevelScore,
            nextLevelScore,
            progress: Math.round(progress),
            pointsToNext: nextLevelScore - currentLevelScore
        };
    }

    // 导出家庭数据
    async exportFamilyData() {
        return {
            family: this.familyData,
            settings: this.settings,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
    }

    // 导入家庭数据
    async importFamilyData(data) {
        try {
            if (data.family) {
                this.familyData = data.family;
                await this.saveFamilyData();
            }
            
            if (data.settings) {
                this.settings = data.settings;
                await this.saveSettings();
            }

            this.emitEvent('dataImported', data);
            return true;
        } catch (error) {
            console.error('导入家庭数据失败:', error);
            return false;
        }
    }
}

// 创建全局实例
window.FamilyManager = new FamilyInteractionManager();

// 导出类以供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FamilyInteractionManager;
} 