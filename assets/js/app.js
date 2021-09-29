window.addEventListener('load', (event) => {

	window.stewards = [];
	window.workstreams = [];

	cachbuster = new Date().getTime();

	Promise.all([
		fetch("assets/json/workstreams.json?"+cachbuster).then(value => value.json()),
		fetch("assets/json/data.json?"+cachbuster).then(value => value.json())
	])
	.then((value) => {
		window.workstreams = value[0];
		window.stewards = value[1];
		init();
	})
	.catch((err) => {
		console.log(err);
	});

});




function init(){

	let imgpath = "assets/stewards/";
	let gitcoinurl = "https://gitcoin.co/";
	
	console.log("init");

	let grid = document.querySelector('#grid');
	let card = document.querySelector('#card');

	window.stewards.forEach(steward => {

		let clone = document.importNode(card.content, true);

		tally_url = "https://www.withtally.com/voter/" + steward.address + "/governance/gitcoin";
		statement_url = "https://gov.gitcoin.co/t/introducing-stewards-governance/41/" + steward.statement_post_id;

		clone.querySelector('#name').innerHTML = steward.name;
		clone.querySelector('#image').src = imgpath + steward.image;

		clone.querySelector('#handle_gitcoin').innerHTML = steward.handle_gitcoin;
		clone.querySelector('#handle_gitcoin').href = gitcoinurl + steward.handle_gitcoin;

		clone.querySelector('#steward_since').innerHTML = steward.steward_since;

		clone.querySelector('#workstream_url').href = "TBD";
		
		clone.querySelector('#votingweight').innerHTML = steward.votingweight;
		
		clone.querySelector('#participation_snapshot').innerHTML = steward.participation_snapshot;

		clone.querySelector('#delegate_button').href = tally_url;
		clone.querySelector('#votingweight_url').href = tally_url;

		clone.querySelector('#forum_post').innerHTML = steward.posts;
		clone.querySelector('#forum_uri').href = "https://gov.gitcoin.co/u/" + steward.handle_forum;

		clone.querySelector('#statement_button').href = statement_url;
		clone.querySelector('#steward_since_url').href = statement_url;

		clone.querySelector('#health').src = "assets/images/health_" + steward.health + ".svg";

		// search tags
		clone.querySelector('#card').dataset.tags = steward.name + steward.handle_gitcoin + steward.handle_forum;
		
		if (steward.workstream){
			stream = window.workstreams.find(o => o.id === steward.workstream);	
			clone.querySelector('#workstream_name').innerHTML = stream.name;
			clone.querySelector('#workstream_url').href = stream.uri;
		}
		else{
			clone.querySelector('#workstream_none').innerHTML = "-";
		}

		document.querySelector('#grid').appendChild(clone);

	});



	const search = document.getElementById("search") 
	const datatags = document.querySelectorAll("[data-tags]")
	
	search.addEventListener("input", () => {
		searchInput = search.value.toLowerCase()
		datatags.forEach(item => {
			tags = item.dataset.tags.toLowerCase()
			if ( tags.indexOf(searchInput) !== -1 ) { item.style.display = '' }
			else { item.style.display = 'none' }		
		});
	});




}



