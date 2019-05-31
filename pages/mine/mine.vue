<template>
	<view class="page">
		<form class='loginView' @submit="handleSubmit">
			<view>
				<text>账户</text>
				<input name="username" type="text"  placeholder="输入wkiwi">
			</view>
			<view>
				<text>密码</text>
				<input name="password" type="password"  placeholder="输入123456">
			</view>
		<button type="default" class="login-btn" hover-class="hover" formType="submit" :disabled="loading" :loading="loading">登录</button>
		<button @click="logout">退出登录</button>
		</form>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				loading : false,
			}
		},
		methods: {
			...mapActions('auth', ['login']),
			// 退出登录
			async logout() {
				console.log('退出登录')
				await this.$store.dispatch('auth/logout')
			},
			handleSubmit(e){
				const { username, password } = e.detail.value;
				console.log(username, password);
				const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>\#$%&\\\=\(\'\"]/gi;

				if (username === '' || !username) {
					uni.showToast({
            icon: 'none',
            title: '请输入你的账号'
          });
					return;
				}

				if (regExp.test(username)) {
					uni.showToast({
            icon: 'none',
            title: '你输入的账号不能有非法字符'
          });
					return;
				}

				if (password === '' || !password) {
					uni.showToast({
            icon: 'none',
            title: '请输入你的密码'
          });
					return;
				}

				if (regExp.test(password)) {
					uni.showToast({
            icon: 'none',
            title: '你输入的密码不能有非法字符'
          });
					return;
				}
				this.loading = true;
				// 登录服务
				this.login({
					username,
					password
				}).then((res) => {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: '登陆成功'
					});
				}).catch((error) => {
					this.loading = false;
					uni.showToast({
						icon: 'none',
						title: `${error}`
					});
				});
			}
		}
	}
</script>

<style>
	.page{
		width: 100%;
	}
	input{
		border: 1px solid #666;
	}
</style>
