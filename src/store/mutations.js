export default {
	SET_USER: (state, user) => {
		state.user = user;
		localStorage.setItem('token', user.token);
		console.log(user);
	}
};
