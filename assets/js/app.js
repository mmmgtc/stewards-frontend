window.addEventListener("load", (event) => {
  window.stewards = [];
  window.workstreams = [];

  cachbuster = new Date().getTime();

  Promise.all([
    fetch("assets/json/workstreams.json?" + cachbuster).then((value) =>
      value.json()
    ),
    fetch("assets/json/stewards_data.json?" + cachbuster).then((value) => value.json()),
  ])
    .then((value) => {
      window.workstreams = value[0];
      window.stewards = value[1].data;
      init();
    })
    .catch((err) => {
      console.log(err);
    });
});

function init() {
  console.log("init...");
  timeVal_div= document.getElementById("timeVal_div");
  timeVal_div.classList.add("highlight");

  // map search input field to filterCard function
  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    filterStewards();
  });

  const timeVal= document.getElementById("timeVal");
  timeVal.addEventListener("input", () => {
    // data shown based on time value selected
    resetSearch();
    orderStewards();
    draw();
  })

  // map orderby input field to orderStewards function
  const orderby = document.getElementById("orderby");
  orderby.addEventListener("input", () => {
    resetSearch();
    orderStewards();
    draw();
  });

  // map direction input field to orderStewards function
  const direction = document.getElementById("direction");
  direction.addEventListener("input", () => {
    resetSearch();
    orderStewards();
    draw();
  });

  // reorder the stewards array on default order
  orderStewards();
  // add all the stewards to the #grid
  draw();

  // inspect location hash ( URL#search=xxx ) and get the params
  params = getParams();
  if (params.search) {
    // set search input field to params.search
    search.value = params.search.toLowerCase();
    // filter from all steward cards
    filterStewards();
  }
}

// get params from location hash

function getParams() {
  var hash = window.location.hash.substring(1);

  var params = hash.split("&").reduce(function (res, item) {
    var parts = item.split("=");
    res[parts[0]] = decodeURIComponent(parts[1]);
    return res;
  }, {});

  return params;
}

function resetSearch() {
  document.location.hash = "";
  search = document.getElementById("search");
  search.value = "";
}

function filterStewards() {
  search = document.getElementById("search");

  let datatags = document.querySelectorAll("[data-tags]");
  //console.log(datatags)

  searchInput = search.value.toLowerCase();
  datatags.forEach((item) => {
    tags = item.dataset.tags.toLowerCase();
    if (tags.indexOf(searchInput) !== -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });

  document.location.hash = "search=" + encodeURIComponent(searchInput);
}

function orderStewards() {
  timeVal = document.getElementById("timeVal").value;
  orderby = document.getElementById("orderby").value;
  direction = document.getElementById("direction").value;
  // console.log(orderby, direction)

  if (orderby == "health") {
    window.stewards.sort((a, b) => (a.health[timeVal] < b.health[timeVal] ? 1 : -1));
  }

  if (orderby == "voting_weight") {
    window.stewards.sort((a, b) => (a.voting_weight < b.voting_weight ? 1 : -1));
  }

  if (orderby == "vote_participation") {
    window.stewards.sort((a, b) =>
      a.vote_participation[timeVal] < b.vote_participation[timeVal] ? 1 : -1
    );
  }

  if (orderby == "forum_activity") {
    window.stewards.sort((a, b) => (a.forum_activity[timeVal] < b.forum_activity[timeVal] ? 1 : -1));
  }

  // ascending - from low to high
  if (direction == "ascending") {
    window.stewards.reverse();
  }
}

function draw() {
  // console.log(window.stewards)

  timeVal = document.getElementById("timeVal").value;
  imgpath = "assets/images/stewards/";
  gitcoinurl = "https://gitcoin.co/";

  grid = document.querySelector("#grid");

  // delete all inner nodes
  grid.innerHTML = "";

  card = document.querySelector("#card");

  // generate all steward cards

  window.stewards.forEach((steward) => {
    clone = document.importNode(card.content, true);

    tally_url =
      "https://www.withtally.com/voter/" +
      steward.address +
      "/governance/gitcoin";
    statement_url = steward.statement_post;

    clone.querySelector("#name").innerHTML = steward.name;
    clone.querySelector("#image").src = imgpath + steward.profile_image;

    clone.querySelector("#handle_gitcoin").innerHTML = steward.gitcoin_username;
    clone.querySelector("#handle_gitcoin").href =
      gitcoinurl + steward.gitcoin_username;

    clone.querySelector("#steward_since").innerHTML = steward.steward_since;

    clone.querySelector("#workstream_url").href = "TBD";

    clone.querySelector("#votingweight").innerHTML = steward.voting_weight;

    // wrap in if condition for 30d/lifetime
    clone.querySelector("#vote_participation").innerHTML = steward.vote_participation[timeVal]+ "%";
    // edge case of vote_participation["lifetime"] !=0 but for ["30d"] being =0, we use lifetime value instead
    // and show "-" for 30days for vote_participation (as feedback from Fred ser)
    if (timeVal == "30d") {
      if (steward.vote_participation["lifetime"]!=0 && steward.vote_participation["30d"]==0) {
        clone.querySelector("#vote_participation").innerHTML = "-";
        // New health calculation :)
        const new_health_for_edgecase= parseInt(((steward.health["30d"] - (steward.vote_participation["30d"]*0.07)) + steward.vote_participation["lifetime"]*0.07));
        clone.querySelector("#health_num").innerHTML = `${new_health_for_edgecase}/10`;
      }
    }

    clone.querySelector("#delegate_button").href = tally_url;
    clone.querySelector("#votingweight_url").href = tally_url;

    clone.querySelector("#forum_post").innerHTML = steward.forum_activity[timeVal];
    clone.querySelector("#forum_uri").href =
      "https://gov.gitcoin.co/u/" + steward.discourse_username;

    clone.querySelector("#statement_button").href = statement_url;
    clone.querySelector("#steward_since_url").href = statement_url;

    if (steward.steward_days > 30) {
      clone.querySelector("#health").src =
      `assets/images/health_${steward.health[timeVal]}.svg`;
      clone.querySelector("#health_num").innerHTML = `${steward.health[timeVal]}/10`;
    } else {
      clone.querySelector("#health").src = "";
      clone.querySelector("#health_num").innerHTML = "New✨";
    }
    

    if (steward.workstream) {
      stream = window.workstreams.find((o) => o.id === steward.workstream);
      clone.querySelector("#workstream_name").innerHTML = stream.name;
      clone.querySelector("#workstream_url").href = stream.uri;
      workstream_tag = stream.name;
    } else {
      clone.querySelector("#workstream_none").innerHTML = "-";
      workstream_tag = " ";
    }

    // search tags
    clone.querySelector("#card").dataset.tags =
      steward.address +
      " " +
      steward.name +
      " " +
      steward.gitcoin_username +
      " " +
      steward.discourse_username +
      " " +
      workstream_tag;

    // apply highlights to cards based on orderby
    orderby = document.getElementById("orderby").value;

    if (orderby == "voting_weight") {
      clone.querySelector("#votingweight").classList.add("highlight");
    }

    if (orderby == "forum_activity") {
      clone.querySelector("#forum_post").classList.add("highlight");
    }

    if (orderby == "vote_participation") {
      clone.querySelector("#vote_participation").classList.add("highlight");
    }

    document.querySelector("#grid").appendChild(clone);
  });
}
