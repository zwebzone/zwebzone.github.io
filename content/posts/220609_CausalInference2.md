---
title: "【含英咀华】因果推理导论系列-2"
date: 2022-06-09
draft: false
type: "post"
tags: ["note", "causal inference"]
showTableOfContents: True
---

> 原书链接和课件：[Introduction to Causal Inference from a Machine Learning Perspective](https://www.bradyneal.com/causal-inference-course)
>
> 本文介绍第二章《潜在结果》（Potential Outcomes）的内容

> 第一章内容：[【含英咀华】因果推理导论系列-1](../220607_causalinference1/)

## 潜在结果和个体处理效果

### 两个场景

> 你不开心了。
>
> 场景一：你有一条狗后会变得开心，但是没有一条狗也会开心。
>
> 场景二：你有一条狗后会变得开心，同时没有一条狗仍不开心。

### 符号定义

> T ：**观察处理（Observed Treatment）**，如 T = 1 代表获得狗狗，反之同理
>
> Y ：**观察结果（Observed Outcome）**，如 Y = 1 代表开心，反之同理
>
> Y<sub>i</sub>(0) ：个体 i 在无处理下的**潜在结果（Potential Outcome）**
>
> Y<sub>i</sub>(1) ：个体 i 在有处理下的潜在结果

有了以上定义，用有无处理下潜在结果的差值，我们还可以进一步定义对于任一个体的**个体处理效果（Individual Treatment Effect，ITE）= Y<sub>i</sub>(1) - Y<sub>i</sub>(0)**。考虑两类不同个体分别对应上述场景，我们可以得知：对于第一类个体，ITE = 0，有无狗狗对其开心没有因果效应，对于第二类个体，则ITE = 1，可以说明有无狗狗影响心情转变。



## 因果推理的基本问题

但是“要观察到某一特定个体的所有潜在结果是不可能的”！除非你有时间机器，否则对于个体，特定选择（处理）只有一次。这也正是**因果推理的基本问题**，对于一个个体，你根本无法同时计算所有的潜在结果（因果推理旨在做出因果论断，这取决于**潜在结果**，而非传统机器学习中的**观察结果**）。

因此，引出了下一个重要定义——**反事实（Counterfactual）**，即没有（也不能）观察到的潜在结果被称为反事实，因为其与**事实**相反。但注意，在所谓事实或反事实还没有真正被观察到时，它们都只是**潜在**结果。



## 跳脱基本问题

### 平均处理效果

既然ITE无法求解，我们能获取哪些统计量去解释呢，找个**平均处理效果（Average Treatment Effect，ATE）**？那先看看可以获得什么数据吧，如表：

![image-20220610030311516](/images/220609_CausalInference2/image-20220610030311516.png)

为了求解E[Y(1) - Y(0)]，可以直接E[Y(1)] - E[Y(0)] = E[Y|T=1] - E[Y|T=0]嘛？很不幸，这样因果关系就会变成关联关系了，就和统计学习方法的操作完全一致了。



### 可忽略性和可互换性

正难则反，那么考虑有什么假设（在什么条件下）可以使得ATE退化成关联差异呢？书中提到了两种理解方式：

#### 可忽略性

在之前的案例中，我们可以发现有一个混杂因子或是说协变量X的影响：

![image-20220610104200152](/images/220609_CausalInference2/image-20220610104200152.png)

假设去掉X->T的路径，即对于不同处理措施的样本，其协变量X是完全随机的，那么因果结构可以变成如下：

![image-20220610104108962](/images/220609_CausalInference2/image-20220610104108962.png)

这样就有下式成立：
$$
\mathbb{E}[Y(1)]-\mathbb{E}[Y(0)] =\mathbb{E}[Y(1) | T=1]-\mathbb{E}[Y(0) | T=0]=\mathbb{E}[Y | T=1]-\mathbb{E}[Y | T=0]
$$




#### 可互换性

可互换性是指对于不同处理措施，如果将它们进行互换，其观察到的结果不会发生变化，形式上说就是：
$$
\mathbb{E}[Y(1) | T=0]=\mathbb{E}[Y(1) | T=1]
$$

$$
\mathbb{E}[Y(0) | T=0]=\mathbb{E}[Y(0) | T=1]​
$$

因此易知，E[Y(i)] = E[Y(i)|T=t]，同理：
$$
\mathbb{E}[Y(1)]-\mathbb{E}[Y(0)] =\mathbb{E}[Y(1) | T=1]-\mathbb{E}[Y(0) | T=0]=\mathbb{E}[Y | T=1]-\mathbb{E}[Y | T=0]
$$




### 四个基本假设（重要）

#### 1. 条件可交换性

![image-20220610024611079](/images/220609_CausalInference2/image-20220610024611079.png)	

#### 2. 条件处理正性

![image-20220610024649916](/images/220609_CausalInference2/image-20220610024649916.png)

#### 3. 个体间无干扰

![image-20220610024714968](/images/220609_CausalInference2/image-20220610024714968.png)

#### 4. 处理结果一致

![image-20220610024733931](/images/220609_CausalInference2/image-20220610024733931.png)



#### 调整公式

![image-20220610031209053](/images/220609_CausalInference2/image-20220610031209053.png)



## 一个完整的例子

### 辨别—估计流程图



### 钠摄入量对血压的影响