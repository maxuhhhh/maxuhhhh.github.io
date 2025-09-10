function generateTweet() {
    const textInput = document.getElementById("tweetText").value.trim();
    const hashtagsInput = document.getElementById("hashtags").value.trim();
    const urlInput = document.getElementById("url").value.trim();

    if (!textInput && !hashtagsInput && !urlInput) {
        return alert("you didnt type anything, silly!");
    }

    if (!textInput) {
        return alert("Your tweet is blank, silly!");
    }

    const text = encodeURIComponent(textInput);
    const hashtags = encodeURIComponent(hashtagsInput.replace(/\s+/g, ""));
    const url = encodeURIComponent(urlInput);

    let tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;
    if (hashtags) tweetUrl += `&hashtags=${hashtags}`;
    if (url) tweetUrl += `&url=${url}`;

    const tweetLink = document.getElementById("tweetLink");
    tweetLink.href = tweetUrl;
    tweetLink.style.display = "block";
    tweetLink.textContent = tweetUrl;
}

function generateFollow() {
    let username = document.getElementById("username").value.trim();

    if (!username) {
        return alert("Your username is blank, silly!");
    }

    if (username.startsWith("@")) {
        username = username.substring(1);
    }

    const followUrl = `https://twitter.com/intent/follow?screen_name=${encodeURIComponent(username)}`;
    const followLink = document.getElementById("followLink");
    followLink.href = followUrl;
    followLink.style.display = "block";
    followLink.textContent = followUrl;
}
