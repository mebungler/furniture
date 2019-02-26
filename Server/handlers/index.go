package handlers

import (
	"net/http"
	"../templates"
)

func Index(w http.ResponseWriter, r *http.Request) {
	var tpl = templates.Ref()
	tpl.ExecuteTemplate(w, "index.gohtml", nil)
}
