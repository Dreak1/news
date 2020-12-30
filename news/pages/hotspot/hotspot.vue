<template>
	<view class="content">
		<view class="top_title">
			热议新闻
		</view>
		<view class="news_wapper" v-for="(iteam,index) in hotspotNews" :key="iteam.id" @click="handleDetail(iteam.id)">
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
				
				hotspotNews: [
					{
						id : "001",
						content: "这是热点新闻排序"
					},
					{
						id : "002",
						content: "呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无呜呜呜呜呜呜呜呜无无"
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			handleDetail(id) {
				uni.navigateTo({
					url:`../detail/detail?id=${id}`
				})
			}
		},
	}
</script>

<style>
	page {
		background-color: #F3F3F3;
	}
	
	.top_title{
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
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
