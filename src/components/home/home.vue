<template>
	<div class="home">
		<Header />
		<div class="left">
			<div class="card-wrapper">
				<div class="title-wrap">
					<div class="logo"><img src="@/assets/facio.png" alt="" /></div>
					<div class="title-combination">
						<h1>vue3-tiptap</h1>
						<h4>This is a powerful rich text editor</h4>
					</div>
				</div>

				<div class="bg-img">
					<img src="@/assets/home-logo.jpeg" alt="" />
				</div>
			</div>
		</div>
		<div class="right">
			<div class="editor-box"><Vue3Tiptap /></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Vue3Tiptap from "../vue3-tiptap";
import Header from "./header/header.vue";
</script>

<style lang="scss" scoped>
@keyframes huerotate {
	100% {
		filter: hue-rotate(360deg);
	}
}

.home {
	padding-top: 64px;
	width: 100%;
	height: 100vh;
	perspective: 700px;
	display: flex;
	background:
		linear-gradient(0deg, transparent 50%, rgba(0, 0, 0, 0.09) 51%, transparent 53%),
		linear-gradient(90deg, transparent 50%, rgba(0, 0, 0, 0.09) 51%, transparent 53%);
	background-size: 20px 20px; /* 网格单元大小 */

	.left {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		.card-wrapper {
			display: flex;
			flex-direction: column;
			gap: 30px;
			border-radius: 10px;
			overflow: hidden;
			.title-wrap {
				margin: 0 auto;
				width: 550px;
				padding: 30px;
				display: flex;
				align-items: center;
				justify-content: space-around;
				border: 3px solid rgba(102, 36, 189, 0.3);
				border-radius: 15px;
				background: rgba(255, 255, 255, 0.7);
				h1 {
					font-size: 45px;
					line-height: 1;
					font-weight: 600;
					color: transparent;
					background: linear-gradient(45deg, pink, #03a9f4, #9c27b0);
					background-clip: text;
					animation: huerotate 10s infinite;
				}
				h4 {
					font-size: 15px;
					line-height: 1;
					letter-spacing: 1px;
					color: #03a9f4;
				}
				.logo {
					width: 85px;
					height: 85px;
					border-radius: 15%;
					overflow: hidden;
					mask: linear-gradient(45deg, #000, transparent);
					img {
						width: 100%;
						height: 100%;
					}
				}
				.logo {
					width: 100px;
					height: 100px;
					border-radius: 15%;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.bg-img {
				width: 650px;
				img {
					width: 100%;
				}
			}
		}
	}
	.right {
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 40px;
		.editor-box {
			width: 100%;
			height: 600px;
		}
	}
}
</style>
