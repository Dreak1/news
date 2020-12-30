<template>
	<view class="content">
		<view class="top_nav">
			<view class="top_content" v-for="(iteam,index) in top_nav" :class="index == currentIndex?'active':''" @click="handleTop(index)">{{iteam}}</view>
		</view>

		<view v-show="currentIndex == 0" class="news_wapper" v-for="(iteam,index) in news" :key="iteam.id" @click="handleDetail(iteam.body)">
			<view class="news">
				<view class="img">
					<image src="../../static/img/3.png" mode=""></image>
				</view>
				<view class="titile">
					{{iteam.content}}
				</view>
			</view>
		</view>

		<view v-show="currentIndex == 1" class="news_wapper" v-for="(iteam,index) in schoolNews" :key="iteam.id" @click="handleDetail(iteam.body)">
			<view class="news">
				<view class="img">
					<image src="../../static/img/3.png" mode=""></image>
				</view>
				<view class="titile">
					{{iteam.content}}
				</view>
			</view>
		</view>

		<view v-show="currentIndex == 2" class="news_wapper" v-for="(iteam,index) in studentNews" :key="iteam.id" @click="handleDetail(iteam.body)">
			<view class="news">
				<view class="img">
					<image src="../../static/img/3.png" mode=""></image>
				</view>
				<view class="titile">
					{{iteam.content}}
				</view>
			</view>
		</view>

		<view v-show="currentIndex == 3" class="news_wapper" v-for="(iteam,index) in teamNews" :key="iteam.id" @click="handleDetail(iteam.body)">
			<view class="news">
				<view class="img">
					<image src="../../static/img/3.png" mode=""></image>
				</view>
				<view class="titile">
					{{iteam.content}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				top_nav: ["新闻总览", "学校新闻", "学生新闻", "社团新闻"],
				news: '',
				schoolNews: [{
						id: "bbb",
						content: "这是学校新闻"
					},
					{
						content: "呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无"
					}
				],
				studentNews: [{
						content: "这是学生新闻"
					},
					{
						content: "呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无"
					}
				],
				teamNews: [{
						content: "这是社团新闻"
					},
					{
						content: "呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无"
					}
				],
			}
		},
		onLoad() {
			this.fetch()
		},
		methods: {
			handleTop(index) {
				this.currentIndex = index
			},
			handleDetail(body) {
				console.log(body)
				uni.navigateTo({
					url: `../detail/detail?body=${body}`
				})
			},
			async fetch() {
				const res = await this.$http({
					url: "/newsList"
				})
				console.log(res.data)
				this.news = res.data
			}
		},

	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}

	.top_nav {
		display: flex;
	}

	.top_nav .top_content {
		width: 25%;
		height: 80rpx;
		border-bottom: 1px solid black;
		text-align: center;
		line-height: 80rpx;
	}

	.top_nav .active {
		color: #ff4400;
		border-color: #ff4400;
	}

	.news_wapper {
		width: 95%;
		margin: 25rpx auto;
		height: 220rpx;
		border-radius: 14rpx;
		background-color: #FFFFFF;
		box-shadow: -4px 0px 20px 0px rgba(0, 0, 0, 0.06);
	}

	.news {
		display: flex;
		margin: 15rpx;
	}

	.titile {
		width: 400rpx;
		height: 170rpx;
		margin: 22rpx 0 10rpx 20rpx;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		display: -webkit-box;
		line-height: 45rpx;
	}

	.img {
		width: 260rpx;
		height: 190rpx;
		margin-top: 15rpx;
	}

	.img image {
		width: 260rpx;
		height: 190rpx;
		background-size: cover;
		border-radius: 10rpx;
	}
</style>
