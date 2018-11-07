  <div class="card-head">

                          <div class="card-buttons">

                            <button class="card-btn" id="save-btn" form="change-form">
                                 <img class="card-btn-img" src="http://defaulticon.com/images/icons32x32/save.png?itok=sWHq42i3">
                            </button>
                             <button class="card-btn" id="close-btn">
                                <img class="card-btn-img" src="http://defaulticon.com/images/icons32x32/cancel.png?itok=vIT63GD3">

                            </button>
                            </div>

                              <div  class="card-title"><%= title %></div>
                        </div>
                        <div class="card-body">
                        <form id="change-form"  onsubmit="return false;">
                                <div class="field">
                                    <label for="title">Имя</label>
                                    <br><input required class="form-control" type="text" id="title" placeholder="Имя" value='<%= title %>'></input>

                                <div class="field">
                                    <label for="description">Описание</label>
                                    <br><input required class="form-control" type="text" id="description" value='<%=description %>'></input>
                                </div>
                                <div class="field">
                                    <label for="coordinates">Координаты</label>
                                    <br><input disabled class="form-control" type="text" id="coordinates" value='<%=point.coordinates%>' ></input>
                                </div>
                                <div class="styled-select">
                                <label for="types">Тип</label>
                                    <div id="select-region"></div>
                                </div>
                        </form>
                        </div>