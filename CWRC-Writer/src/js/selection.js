function Selection(config) {
	
	var w = config.writer;
	
	$(config.parentId).append('<div id="selection" style="margin-left: 10px;"></div>');
	$(document.body).append('<div id="selectionContents" style="display: none;"></div>');
	
	var selection = {};
	
	function updateSelection(ed, evt) {
		var range = ed.selection.getRng(true);
		var contents = range.cloneContents();
		$('#selectionContents').html(contents);
		var escapedContents = w.u.escapeHTMLString($('#selectionContents')[0].innerHTML);
		if (escapedContents.length < 100000) {
			$('#selection').html('<pre>'+escapedContents+'</pre>');
			$('#selection > pre').snippet('html', {
				style: 'typical',
				transparent: true,
				showNum: false,
				menu: false
			});
		} else {
			$('#selection').html('<pre>The selection is too large to display.</pre>');
		}
	}
	
	selection.init = function() {
		w.editor.onNodeChange.add(updateSelection);
	};
	
	return selection;
}