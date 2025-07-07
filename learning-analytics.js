/**
 * 萌芽AI - 深度学习分析引擎
 * 提供智能化的学习行为分析、能力评估和个性化建议
 */

class LearningAnalyticsEngine {
    constructor() {
        this.analysisHistory = [];
        this.learningPatterns = {};
        this.personalityProfile = {};
        this.strengthsWeaknesses = {};
        this.init();
    }

    // 初始化分析引擎
    async init() {
        await this.loadHistoricalData();
        await this.initializePersonalityProfile();
        // 学习分析引擎已启动
    }

    // ============ 核心分析功能 ============

    /**
     * 综合学习分析
     * @param {Object} sessionData - 学习会话数据
     * @returns {Object} 分析结果
     */
    async analyzeComprehensively(sessionData) {
        const analysis = {
            timestamp: Date.now(),
            sessionId: sessionData.sessionId,
            
            // 基础能力分析
            abilityAnalysis: await this.analyzeAbilities(sessionData),
            
            // 学习行为模式分析
            behaviorPatterns: await this.analyzeBehaviorPatterns(sessionData),
            
            // 个性化特征分析
            personalityInsights: await this.analyzePersonality(sessionData),
            
            // 学习效率分析
            efficiencyMetrics: await this.analyzeEfficiency(sessionData),
            
            // 情感状态分析
            emotionalState: await this.analyzeEmotionalState(sessionData),
            
            // 个性化建议
            personalizedRecommendations: await this.generateRecommendations(sessionData),
            
            // 预测分析
            predictions: await this.generatePredictions(sessionData)
        };

        // 保存分析结果
        this.saveAnalysis(analysis);
        
        return analysis;
    }

    // ============ 能力分析模块 ============

    /**
     * 多维度能力分析
     */
    async analyzeAbilities(sessionData) {
        const abilities = {
            // 语言表达能力
            expression: {
                vocabulary: this.analyzeVocabulary(sessionData.answer),
                fluency: this.analyzeFluency(sessionData.answer),
                creativity: this.analyzeCreativity(sessionData.answer),
                grammar: this.analyzeGrammar(sessionData.answer),
                score: 0,
                level: '',
                improvement: 0
            },
            
            // 逻辑思维能力
            logic: {
                structure: this.analyzeLogicalStructure(sessionData.answer),
                reasoning: this.analyzeReasoning(sessionData.answer),
                problemSolving: this.analyzeProblemSolving(sessionData),
                score: 0,
                level: '',
                improvement: 0
            },
            
            // 创意思维能力
            creativity: {
                originality: this.analyzeOriginality(sessionData.answer),
                imagination: this.analyzeImagination(sessionData.answer),
                flexibility: this.analyzeFlexibility(sessionData.answer),
                elaboration: this.analyzeElaboration(sessionData.answer),
                score: 0,
                level: '',
                improvement: 0
            },
            
            // 专注持续力
            focus: {
                taskCompletion: this.analyzeTaskCompletion(sessionData),
                timeManagement: this.analyzeTimeManagement(sessionData),
                distractionResistance: this.analyzeDistractionResistance(sessionData),
                score: 0,
                level: '',
                improvement: 0
            }
        };

        // 计算综合评分
        for (const [abilityName, abilityData] of Object.entries(abilities)) {
            abilityData.score = this.calculateAbilityScore(abilityData);
            abilityData.level = this.determineAbilityLevel(abilityData.score);
            abilityData.improvement = this.calculateImprovement(abilityName, abilityData.score);
        }

        return abilities;
    }

    // 词汇分析
    analyzeVocabulary(text) {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const uniqueWords = new Set(words.map(w => w.toLowerCase()));
        
        // 词汇丰富度评分
        const richness = uniqueWords.size / words.length;
        
        // 高级词汇检测
        const advancedWords = this.detectAdvancedVocabulary(Array.from(uniqueWords));
        
        // 情感词汇分析
        const emotionalWords = this.detectEmotionalVocabulary(Array.from(uniqueWords));
        
        return {
            totalWords: words.length,
            uniqueWords: uniqueWords.size,
            richness: Math.round(richness * 100),
            advancedWordsCount: advancedWords.length,
            emotionalWordsCount: emotionalWords.length,
            score: Math.min(100, Math.round((richness * 50) + (advancedWords.length * 5) + (emotionalWords.length * 3)))
        };
    }

    // 流畅度分析
    analyzeFluency(text) {
        const sentences = text.split(/[。！？.!?]+/).filter(s => s.trim().length > 0);
        
        // 句子长度变化度
        const sentenceLengths = sentences.map(s => s.length);
        const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
        const variance = sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgLength, 2), 0) / sentenceLengths.length;
        
        // 连接词使用
        const connectors = ['因为', '所以', '但是', '然而', '而且', '因此', '首先', '然后', '最后'];
        const connectorsUsed = connectors.filter(conn => text.includes(conn)).length;
        
        return {
            sentenceCount: sentences.length,
            avgSentenceLength: Math.round(avgLength),
            lengthVariance: Math.round(variance),
            connectorsUsed,
            score: Math.min(100, Math.round((connectorsUsed * 10) + (50 / (1 + variance / 100))))
        };
    }

    // 创意性分析
    analyzeCreativity(text) {
        // 创意词汇检测
        const creativeWords = ['神奇', '奇妙', '独特', '想象', '梦幻', '彩虹', '魔法', '冒险'];
        const creativeWordsCount = creativeWords.filter(word => text.includes(word)).length;
        
        // 比喻和拟人检测
        const metaphors = this.detectMetaphors(text);
        const personifications = this.detectPersonifications(text);
        
        // 创新表达检测
        const novelExpressions = this.detectNovelExpressions(text);
        
        return {
            creativeWordsCount,
            metaphorsCount: metaphors.length,
            personificationsCount: personifications.length,
            novelExpressionsCount: novelExpressions.length,
            score: Math.min(100, (creativeWordsCount * 8) + (metaphors.length * 15) + (personifications.length * 12) + (novelExpressions.length * 10))
        };
    }

    // ============ 学习行为模式分析 ============

    async analyzeBehaviorPatterns(sessionData) {
        const patterns = {
            // 学习时间偏好
            timePreferences: await this.analyzeTimePreferences(),
            
            // 任务完成模式
            taskCompletionPatterns: this.analyzeTaskPatterns(sessionData),
            
            // 互动偏好
            interactionPreferences: await this.analyzeInteractionPatterns(),
            
            // 学习策略偏好
            learningStrategies: await this.analyzeLearningStrategies(),
            
            // 注意力模式
            attentionPatterns: this.analyzeAttentionPatterns(sessionData)
        };

        return patterns;
    }

    // 分析学习时间偏好
    async analyzeTimePreferences() {
        const historicalData = await MengyaUtils.Data.getData('child.learningHistory') || [];
        
        if (historicalData.length === 0) {
            return { pattern: 'insufficient_data', confidence: 0 };
        }

        // 按时间段统计学习效果
        const timeSlots = {
            morning: [], // 8:00-12:00
            afternoon: [], // 12:00-18:00  
            evening: [] // 18:00-22:00
        };

        historicalData.forEach(session => {
            const hour = new Date(session.timestamp).getHours();
            if (hour >= 8 && hour < 12) {
                timeSlots.morning.push(session.score);
            } else if (hour >= 12 && hour < 18) {
                timeSlots.afternoon.push(session.score);
            } else if (hour >= 18 && hour < 22) {
                timeSlots.evening.push(session.score);
            }
        });

        // 计算各时段平均分数
        const averages = {};
        let bestSlot = '';
        let bestScore = 0;

        for (const [slot, scores] of Object.entries(timeSlots)) {
            if (scores.length > 0) {
                const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
                averages[slot] = avg;
                if (avg > bestScore) {
                    bestScore = avg;
                    bestSlot = slot;
                }
            }
        }

        return {
            pattern: bestSlot,
            averages,
            confidence: Math.min(100, historicalData.length * 5),
            recommendation: this.getTimeRecommendation(bestSlot)
        };
    }

    // ============ 个性化建议生成 ============

    async generateRecommendations(sessionData) {
        const abilities = await this.analyzeAbilities(sessionData);
        const patterns = await this.analyzeBehaviorPatterns(sessionData);
        
        const recommendations = {
            immediate: [], // 立即建议
            shortTerm: [], // 短期建议（1周内）
            longTerm: [], // 长期建议（1月内）
            adaptive: [] // 自适应建议
        };

        // 基于能力分析生成建议
        this.generateAbilityBasedRecommendations(abilities, recommendations);
        
        // 基于行为模式生成建议
        this.generatePatternBasedRecommendations(patterns, recommendations);
        
        // 基于个性特征生成建议
        this.generatePersonalityBasedRecommendations(recommendations);
        
        return recommendations;
    }

    generateAbilityBasedRecommendations(abilities, recommendations) {
        for (const [abilityName, abilityData] of Object.entries(abilities)) {
            if (abilityData.score < 70) {
                // 能力需要提升
                recommendations.immediate.push({
                    type: 'improvement',
                    ability: abilityName,
                    title: `提升${this.getAbilityDisplayName(abilityName)}`,
                    description: this.getImprovementSuggestion(abilityName, abilityData),
                    priority: 'high',
                    estimatedDuration: '10-15分钟',
                    activities: this.getRecommendedActivities(abilityName)
                });
            } else if (abilityData.score > 85) {
                // 能力表现优秀，可以挑战更高难度
                recommendations.shortTerm.push({
                    type: 'challenge',
                    ability: abilityName,
                    title: `挑战更高难度的${this.getAbilityDisplayName(abilityName)}任务`,
                    description: this.getAdvancedChallenge(abilityName, abilityData),
                    priority: 'medium',
                    estimatedDuration: '20-30分钟',
                    activities: this.getAdvancedActivities(abilityName)
                });
            }
        }
    }

    // ============ 预测分析模块 ============

    async generatePredictions(sessionData) {
        const historicalData = await MengyaUtils.Data.getData('child.learningHistory') || [];
        
        return {
            // 能力发展预测
            abilityGrowth: this.predictAbilityGrowth(historicalData),
            
            // 学习目标达成预测
            goalAchievement: this.predictGoalAchievement(historicalData),
            
            // 潜在风险预测
            riskFactors: this.predictRiskFactors(sessionData, historicalData),
            
            // 最佳学习路径预测
            optimalPath: this.predictOptimalLearningPath(historicalData)
        };
    }

    // ============ 情感状态分析 ============

    async analyzeEmotionalState(sessionData) {
        const textEmotions = this.analyzeTextEmotions(sessionData.answer);
        const behaviorEmotions = this.analyzeBehaviorEmotions(sessionData);
        
        return {
            // 文本情感分析
            textual: textEmotions,
            
            // 行为情感分析
            behavioral: behaviorEmotions,
            
            // 综合情感状态
            overall: this.combineEmotionalAnalysis(textEmotions, behaviorEmotions),
            
            // 情感建议
            recommendations: this.generateEmotionalRecommendations(textEmotions, behaviorEmotions)
        };
    }

    // ============ 工具方法 ============

    detectAdvancedVocabulary(words) {
        const advancedVocab = [
            '卓越', '精湛', '绚烂', '瑰丽', '恢弘', '磅礴', '澎湃', '激昂',
            '深邃', '渊博', '睿智', '灵敏', '敏锐', '细腻', '精妙', '巧妙'
        ];
        return words.filter(word => advancedVocab.includes(word));
    }

    detectMetaphors(text) {
        const metaphorPatterns = [
            /(.+)像(.+)/g,
            /(.+)如(.+)/g,
            /(.+)是(.+)/g
        ];
        
        const metaphors = [];
        metaphorPatterns.forEach(pattern => {
            const matches = text.matchAll(pattern);
            for (const match of matches) {
                metaphors.push(match[0]);
            }
        });
        
        return metaphors;
    }

    calculateAbilityScore(abilityData) {
        // 根据具体能力数据计算综合分数
        const weights = {
            vocabulary: 0.3,
            fluency: 0.25,
            creativity: 0.25,
            grammar: 0.2
        };
        
        let totalScore = 0;
        let totalWeight = 0;
        
        for (const [component, data] of Object.entries(abilityData)) {
            if (typeof data === 'object' && data.score !== undefined) {
                const weight = weights[component] || 0.1;
                totalScore += data.score * weight;
                totalWeight += weight;
            }
        }
        
        return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
    }

    determineAbilityLevel(score) {
        if (score >= 90) return '优秀';
        if (score >= 80) return '良好';
        if (score >= 70) return '一般';
        if (score >= 60) return '待提升';
        return '需要加强';
    }

    // 保存分析结果
    async saveAnalysis(analysis) {
        this.analysisHistory.push(analysis);
        
        // 保存到全局数据系统
        await MengyaUtils.Data.setData('analytics.latestAnalysis', analysis);
        await MengyaUtils.Data.setData('analytics.history', this.analysisHistory.slice(-50)); // 只保留最近50次
        
        // 更新学习进度数据
        this.updateProgressData(analysis);
    }

    async updateProgressData(analysis) {
        const progressData = {
            lastAnalysisDate: analysis.timestamp,
            abilities: {},
            overallImprovement: 0,
            trends: await this.calculateTrends()
        };

        // 更新能力进度
        for (const [abilityName, abilityData] of Object.entries(analysis.abilityAnalysis)) {
            progressData.abilities[abilityName] = {
                currentScore: abilityData.score,
                level: abilityData.level,
                improvement: abilityData.improvement,
                trend: this.calculateAbilityTrend(abilityName)
            };
        }

        await MengyaUtils.Data.setData('child.progress.analysis', progressData);
    }

    // 加载历史数据
    async loadHistoricalData() {
        const history = await MengyaUtils.Data.getData('analytics.history');
        if (history) {
            this.analysisHistory = history;
        }
    }

    async initializePersonalityProfile() {
        let profile = await MengyaUtils.Data.getData('child.personalityProfile');
        if (!profile) {
            profile = {
                learningStyle: 'visual', // visual, auditory, kinesthetic
                motivationStyle: 'achievement', // achievement, social, curiosity
                communicationStyle: 'expressive', // expressive, reserved, analytical
                attentionSpan: 'medium', // short, medium, long
                confidenceLevel: 'medium', // low, medium, high
                riskTolerance: 'medium' // low, medium, high
            };
            await MengyaUtils.Data.setData('child.personalityProfile', profile);
        }
        this.personalityProfile = profile;
    }

    // 获取能力显示名称
    getAbilityDisplayName(abilityName) {
        const names = {
            expression: '语言表达能力',
            logic: '逻辑思维能力', 
            creativity: '创意思维能力',
            focus: '专注持续力'
        };
        return names[abilityName] || abilityName;
    }
}

// 全局暴露学习分析引擎
window.LearningAnalytics = new LearningAnalyticsEngine();

// 添加到MengyaUtils
if (window.MengyaUtils) {
    window.MengyaUtils.Analytics = window.LearningAnalytics;
}

// 深度学习分析引擎已加载 