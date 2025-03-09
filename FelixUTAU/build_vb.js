	//	 \(^Д^)/		//
	//		 (ノ>Д<)ノ	//
	//	 \(^Д^)/		//
	//		 (ノ>Д<)ノ	//

function loadJSON(url, async = false)
{
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, async); // false makes it synchronous
	xhr.send(null);
	
	if (xhr.status === 200) { return JSON.parse(xhr.responseText); } else {
		throw new Error("Synchronous load failed: " + xhr.statusText); }
}
const data = loadJSON("vb_data.json");

if (!data.length) { throw new Error('NO VOICEBANKS FOUND!'); }

var main_grid = document.createElement('div');
main_grid.className = 'div_center flex-container flx_col0 flx_aliC flx_cntr';
main_grid.id = 'main_vb';

const play__icon = '>';
const pause_icon = '~';
const stop__icon = '|';

const grid_vb_cont = Array.from({ length: data.length }, () => document.createElement('div'));
for (var i = 0; i < data.length; i++)
{
	var val = data[i];
	val.audio_cursor = 0;

	grid_vb_cont[i].className = `flex-container flx_ali0 flx_col0 vb_all`;
	grid_vb_cont[i].id = val.name;

	const __div = Array.from({length:5}, (_,i) => { const div=document.createElement('div'); div.className=`flex-container flx_row0 flx_aliC vb_${i+1}_0`; return div; });

	if (val.name.length)
	{
		var __title = document.createElement('p');

		__title.innerHTML = "<br><b>" + val.name;
		__title.className = 'skewed t-sL t-c1 t-w9 t-f1 vb_1_1';
		__title.style = "top: min(4vh, 4vw);";
		__title.id = "title";

		grid_vb_cont[i].appendChild(__div[0]);
		grid_vb_cont[i].querySelector(".vb_1_0").appendChild(__title);
	}
	if (val.desc.length)
	{
		var __desc = document.createElement('p');
		var __desc_line = document.createElement('div');

		__desc.innerHTML = val.desc;
		__desc.className = 't-aC t-sM t-c1 t-w1 t-f1 vb_2_1';
		__desc.style = "top: max(-.314vh, -.314vw);";
		__desc.id = "desc";

		__desc_line.style = "background-color: #FFFFFFFF; height: min(.1412vw, .1412vh); width: 100%; border-radius: 100%;";

		__div[1].className = __div[1].className.replace("flx_row0", "flx_col0");
		grid_vb_cont[i].appendChild(__div[1]);
		grid_vb_cont[i].querySelector(".vb_2_0").appendChild(__desc);
		grid_vb_cont[i].querySelector(".vb_2_0").appendChild(__desc_line);
	}	
	if (is_dictionary(val.recording))
	{
		var __language = document.createElement('p');
		var __method = document.createElement('p');
		var __pitch_append = document.createElement('p');
		var __software = document.createElement('p');
		
		__language.innerHTML = "Language<br>> " + val.recording.language + " <";
		__language.className = 't-aC t-sM t-c1 t-w1 t-f1 vb_3_1';
		__language.id = "language";
		
		__method.innerHTML = "Record Method<br>> " + val.recording.method + " <";
		__method.className = 't-aC t-sM t-c1 t-w1 t-f1 vb_3_2';
		__method.id = "method";
		
		__pitch_append.innerHTML = "Pitch / Appends<br>> " + val.recording.pitch_append + " <";
		__pitch_append.className = 't-aC t-sM t-c1 t-w1 t-f1 vb_3_3';
		__pitch_append.id = "pitch_append";
		
		__software.innerHTML = "Software<br>> " + val.recording.software + " <";
		__software.className = 't-aC t-sM t-c1 t-w1 t-f1 vb_3_3';
		__software.id = "software";
		
		grid_vb_cont[i].appendChild(__div[2]);
		grid_vb_cont[i].querySelector(".vb_3_0").appendChild(__language);
		grid_vb_cont[i].querySelector(".vb_3_0").appendChild(__method);
		grid_vb_cont[i].querySelector(".vb_3_0").appendChild(__pitch_append);
		grid_vb_cont[i].querySelector(".vb_3_0").appendChild(__software);
	}
	if (val.audio.length)
	{
		var __name = document.createElement('button');
		var __play = document.createElement('button');
		var __stop = document.createElement('button');

		__div[3].className += ' flx_cntr';
		
		val.audio_cursor = Math.max(0, Math.min(val.audio_cursor, val.audio.length - 1));

		__name.innerHTML = val.audio[val.audio_cursor].name;
		__name.setAttribute('onclick', `change_audio(1, "${i}")`);
		__name.className = 'unselectable t-aC t-sM t-cA t-w7 t-f1 vb_4_1';
		__name.id = "name";

		__play.innerHTML = play__icon;
		__play.setAttribute('onclick', `play_audio("${i}")`);
		__play.className = 'unselectable t-aC t-sM t-cA t-w7 t-f1 vb_4_2';
		__play.id = "play";

		__stop.innerHTML = stop__icon;
		__stop.setAttribute('onclick', `play_audio("${i}", 1)`);
		__stop.className = 'unselectable t-aC t-sM t-cA t-w7 t-f1 vb_4_3';
		__stop.id = "stop";

		for (var j = 0; j < val.audio.length; j++)
		{	val.audio[j].obj = new Audio(val.audio[j].link);	}
		
		grid_vb_cont[i].appendChild(__div[3]);
		grid_vb_cont[i].querySelector(".vb_4_0").appendChild(__name);
		grid_vb_cont[i].querySelector(".vb_4_0").appendChild(__play);
		grid_vb_cont[i].querySelector(".vb_4_0").appendChild(__stop);
	}
	else val.audio_cursor = -1;
	if (val.link != null && val.link.length && val.link != "SOON" && val.link != "COMING SOON")
	{
		var __download = document.createElement('button');
		
		__download.innerHTML = "DOWNLOAD・" + compress_size(val.size);
		__download.onclick = "window.location.href='https://" + val.link + "';";
		__download.className = 'unselectable t-aC t-sM t-cA t-w7 t-f1 vb_5_1';
		
		grid_vb_cont[i].appendChild(__div[4]);
		grid_vb_cont[i].querySelector(".vb_5_0").appendChild(__download);
	}
	main_grid.appendChild(grid_vb_cont[i]);
}
document.body.appendChild(main_grid);

function play_audio(voicebank, stop = false)
{
	if (data[voicebank].audio_cursor < 0) return;
	
	const audio = data[voicebank].audio[data[voicebank].audio_cursor].obj;
	if (!stop)
	{
		if (audio.paused)
		{
			grid_vb_cont[voicebank].querySelector("#play").innerHTML = pause_icon;
			audio.play();
		}
		else
		{
			grid_vb_cont[voicebank].querySelector("#play").innerHTML = play__icon;
			audio.pause();
		}
	}
	else
	{
		grid_vb_cont[voicebank].querySelector("#play").innerHTML = play__icon;
		audio.pause();
		audio.currentTime = 0;
	}
};

function change_audio(move, voicebank)
{
	if (!data[voicebank].audio.length || data[voicebank].audio_cursor < 0) return;
	data[voicebank].audio[data[voicebank].audio_cursor].obj.pause();
	data[voicebank].audio_cursor = (data[voicebank].audio_cursor + move) % data[voicebank].audio.length;
	if (data[voicebank].audio_cursor < 0) data[voicebank].audio_cursor += data[voicebank].audio.length;
	grid_vb_cont[voicebank].querySelector("#name").innerHTML = data[voicebank].audio[data[voicebank].audio_cursor].name
	grid_vb_cont[voicebank].querySelector("#play").innerHTML = play__icon;
}

function compress_size(size) { return size / Math.pow(1000, Math.floor(Math.log10(size) / 3)) + ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][Math.floor(Math.log10(size) / 3)]; }

function is_dictionary(obj) { return (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) ? Object.keys(val.recording).length : -1; }