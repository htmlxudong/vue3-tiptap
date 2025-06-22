<template>
	<header class="header">
		<div class="avatar">
			<img src="@/assets/user.png" alt="" />
		</div>
		<ul class="list">
			<!-- <li class="item"><span>文档</span></li> -->
			 <li class="item">
				<span>
					<router-link class="a-tag" to="/">Home</router-link>
				</span>
			</li>
			<li class="item">
				<span>
					<router-link class="a-tag" to="demo">Demo</router-link>
				</span>
			</li>
			<li class="item">
				<span>
					<a class="a-tag" href="https://tiptap.dev/docs" target="_blank">Tiptap</a>
				</span>
			</li>

			<!-- <li class="item"><span>语言</span></li>
            <li class="item"><span>主题</span></li> -->
			<li class="item">
				<a class="a-tag" href="https://github.com/htmlxudong/vue3-tiptap" target="_blank">
					<GithubOutlined />
				</a>
			</li>
		</ul>
	</header>
</template>

<script setup lang="ts">
import { GithubOutlined } from "@ant-design/icons-vue";
</script>

<style lang="scss" scoped>
.li--active {
	background-color: #8cc7b5 !important;
	color: #fff !important;
}

@property --houdini-routine {
	syntax: "<color>";
	inherits: false;
	initial-value: #333;
}

@property --houdini-hover {
	syntax: "<color>";
	inherits: false;
	initial-value: #fff;
}

.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 64px;
	display: flex;
	padding: 0 40px;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	z-index: 10;
	box-shadow: 0 0 5px #fee2e2;

	.avatar {
		width: 54px;
		height: 54px;

		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	.list {
		padding: 0;
		margin: 0;
		display: flex;
		list-style: none;

		.item {
			color: var(--houdini-routine);
			font-weight: 600;
			cursor: pointer;
			padding: 10px 15px;
			position: relative;
			z-index: 1;
			border-radius: 6px;
			overflow: hidden;
			transition: color 0.3s ease;

			span {
				display: block;
				z-index: 1;
				position: relative;
				font-weight: 600;
				font-size: 14px;
				user-select: none;
			}

			&::before {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				width: 140px;
				height: 140px;
				border-radius: 50%;
				transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
				transition:
					opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1),
					transform 1s cubic-bezier(0.19, 1, 0.22, 1);
				background-color: #8cc7b5;
				opacity: 0;
			}

			&:hover {
				color: var(--houdini-hover);

				&:before {
					opacity: 0.8;
					transition-duration: 0.8s;
					transform: translate3d(-50%, -50%, 0) scale3d(1.2, 1.2, 1.2);
				}
			}

			.a-tag {
				color: inherit;
				text-decoration: none;
			}
		}
	}
}
</style>
