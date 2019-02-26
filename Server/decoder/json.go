package decoder

import (
	"io"
	"encoding/json"
)

func Get(closer io.ReadCloser,item interface{}) error {
	decoder :=json.NewDecoder(closer)
	err:=decoder.Decode(item)
	if err != nil {
		return err
	}
	return nil
}




