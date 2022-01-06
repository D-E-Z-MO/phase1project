const getChildren = () => {
  return fetch("https://www.reddit.com/.json")
    .then((response) => response.json())
    .then((post) => {
      // console.log(post.data.children);
      return post.data.children.map((c) => {
        const child = c.data;
        let timeStamp = `${child.created_utc}`;
        const date = new Date(timeStamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();

        const timeS = month + " " + day + " " + year + " " + hour + ":" + min;

        return {
          title: child.title,
          url: `https://www.reddit.com${child.permalink}`,
          image: child.url,
          isImage: child.post_hint === "image",
          author: child.author,
          created: `${timeS}`,
          ups: child.ups,
          downs: child.downs,
        };
      });
    });
};

function renderControl(num) {
  const slider = document.querySelector(".slider");
  for (var i = 0; i <= num; i++) {
    const aTag = document.createElement("a");
    aTag.addEventListener("click", function (e) {
      // e.preventDefault();
      const slide = document.getElementById("slide-1");
      console.log(slide);
    });

    aTag.href = `#slide-${i}`;
    aTag.innerText = i + 1;
    slider.appendChild(aTag);
  }
}

function renderCard(slides, post, id) {
  const card = document.createElement("div");
  card.innerHTML = `
  <div id="slide-${id + 1}">
      <div class="card">
       <header class="card-header">
        <p class="title is-6">${post.title}</p>
       </header>
        ${
          post.isImage
            ? `<div class="card-image">
          <figure class="image is-3by2">
            <img
              src="${post.image}"
              alt="Placeholder image"
            />
          </figure>
        </div>`
            : `<div class="card-image">
            <figure class="image is-3by2">
              <img
                src="https://picsum.photos/200?random=1"
                alt="Placeholder image"
              />
            </figure>
          </div>`
        }
         <div class="card-content">
          <div class="media-content">
          This post was created by <a>@${post.author}</a>   
          </div>
          <time datetime="2016-1-1">${post.created}</time>

          
          <div class="content">
            <a class="up-btn">🔼 </a>
            <br />
            <a class="vote" href="${post.url}">${post.ups}.k Voted</a>
            <br />
            <a class="dwn-btn">⬇️
            </a>
            <br />
            
          </div>
        </div>
        <footer class="card-footer">
          <a target="_blank" href="${
            post.url
          }" class="card-footer-item">Read more!</a>
  
        </footer>
      </div>
    </div>  
    `;
  let vote = card.querySelector(".vote");
  card.querySelector(".up-btn").addEventListener("click", function (e) {
    const ups = parseInt(vote.textContent, 10);
    vote.textContent = `${ups + 1}.k Voted`;
  });
  card.querySelector(".dwn-btn").addEventListener("click", function (e) {
    const ups = parseInt(vote.textContent, 10);
    vote.textContent = `${ups - 1}.k Voted`;
  });

  slides.appendChild(card);
}

function renderChildren(posts) {
  const slides = document.querySelector(".slides");

  posts.forEach((post, id, created) => renderCard(slides, post, id, created));
  renderControl(posts.length);
}

getChildren().then(renderChildren);
