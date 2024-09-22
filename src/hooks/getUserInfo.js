const getUserInfo = () => {
    const username = localStorage.getItem("username")
    const uid = localStorage.getItem("uid")

    return {username, uid}
}

export default getUserInfo;