webpackJsonp([4],{"78KU":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});s("G0J2");var a=s("mw3O"),n=s.n(a),o={components:{wMenu:s("zIkb").default,wFooter:s("mzkE").default},data:function(){return{BASE_URL:"http://www.panzhihui.cn/watermelon",BASE_API:"http://www.panzhihui.cn/watermelon_api/",new_date:Date.now(),query_title:"",query_type_string:"",query_content:"",create_title:"",pageSize:10,pageNum:1,create_type_string:"",new_is_show:!1,datalist:[{date:"2019-06-02",content:"例子:只能看到自己的日志和心情"},{date:"2018-01-01",content:"例子:这是许久以前的美好回忆"}],new_content:"",editorOption:{modules:{toolbar:[["bold","italic","underline","strike",{header:[]},{size:[]}],["code-block",{list:"ordered"},{list:"bullet"}]]}},pageInfo:null}},methods:{query:function(){var e=this;this.$axios.post(this.BASE_API+"article/select",n.a.stringify({title:this.query_title,typeString:this.query_type_string,pageSize:this.pageSize,pageNum:this.pageNum}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),1==t.data.success?(e.datalist=t.data.data.list,e.pageInfo=t.data.data,e.pageInfo.list=null):t.data.message&&"用户未登录"==t.data.message?(e.$message({showClose:!0,type:"error",message:"登录后使用记事"}),sessionStorage.removeItem("customerId"),sessionStorage.removeItem("customerPhone"),sessionStorage.removeItem("customerNickname"),this.$router.push({name:"login"})):e.$message({showClose:!0,type:"error",message:t.data.message})}).catch(function(e){console.log(e)})},new_button_save:function(){var e=this;this.$axios.post(this.BASE_API+"article/insert",n.a.stringify({time:this.dateFormat(this.new_date),createType:this.create_type,createTitle:this.create_title,timeString:this.dateFormat(this.new_date)}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),1==t.data.success?(e.new_content="",e.new_is_show=!1,e.query()):t.data.message&&"用户未登录"==t.data.message?(e.$message({showClose:!0,type:"error",message:"长时间未操作,请重新登录后再记事."}),sessionStorage.removeItem("customerId"),sessionStorage.removeItem("customerPhone"),sessionStorage.removeItem("customerNickname")):e.$message({showClose:!0,type:"error",message:t.data.message})}).catch(function(e){console.log(e)})},show_new:function(){this.new_is_show?this.new_is_show=!1:this.new_is_show=!0},click_edit:function(e){this.datalist[e].edit?this.datalist[e].edit=!1:this.datalist[e].edit=!0,console.log("change edit to = "+this.datalist[e].edit),this.new_is_show=!this.new_is_show,this.new_is_show=!this.new_is_show},save_edit_button:function(e,t){var s=this;this.$axios.post(this.BASE_API+"article/update",n.a.stringify({id:t.id,content:t.content}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){console.log(e),1==e.data.success?s.$message({showClose:!0,message:"保存成功",type:"success"}):s.$message({showClose:!0,type:"error",message:e.data.message})}).catch(function(e){console.log(e)})},save_edit_button_close:function(e,t){var s=this;this.$axios.post(this.BASE_API+"article/update",n.a.stringify({id:t.id,content:t.content}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),1==t.data.success?(s.datalist[e].edit?s.datalist[e].edit=!1:s.datalist[e].edit=!0,console.log("change edit to = "+s.datalist[e].edit),s.new_is_show=!s.new_is_show,s.new_is_show=!s.new_is_show,s.$message({showClose:!0,message:"保存成功",type:"success"})):s.$message({showClose:!0,type:"error",message:t.data.message})}).catch(function(e){console.log(e)})},dateFormat:function(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},changePage:function(e){this.pageNum=e,this.query()},delete_item:function(e,t){var s=this;this.$axios.post(this.BASE_API+"article/delete",n.a.stringify({id:t.id}),{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(t){console.log(t),1==t.data.success?(s.$message({showClose:!0,message:"删除成功",type:"success"}),s.datalist[e]):s.$message({showClose:!0,type:"error",message:t.data.message})}).catch(function(e){console.log(e)})}},mounted:function(){this.query()}},i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"w-max-width"},[s("wMenu"),e._v(" "),s("br"),e._v(" "),s("el-form",{staticClass:"demo-form-inline w-aligncenter",attrs:{inline:!0}},[s("el-form-item",{attrs:{label:""}},[s("el-input",{staticStyle:{width:"105px"},attrs:{placeholder:"请输入类别"},model:{value:e.query_type_string,callback:function(t){e.query_type_string=t},expression:"query_type_string"}}),e._v(" "),s("el-input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入标题"},model:{value:e.query_title,callback:function(t){e.query_title=t},expression:"query_title"}}),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.query}},[e._v("查询")]),e._v(" "),e.new_is_show?e._e():s("el-button",{attrs:{type:"primary"},on:{click:e.show_new}},[e._v("新建文章")]),e._v(" "),e.new_is_show?s("el-button",{attrs:{type:"primary"},on:{click:e.show_new}},[e._v("关闭新建")]):e._e()],1)],1),e._v(" "),s("div",{staticClass:"block"},[s("div",[e.new_is_show?s("div",{attrs:{placement:"top"}},[s("el-card",[[s("el-row",{staticClass:"w-marginbottom w-aligncenter",attrs:{gutter:10}},[s("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.new_date,callback:function(t){e.new_date=t},expression:"new_date"}}),e._v(" "),s("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.create_title,callback:function(t){e.create_title=t},expression:"create_title"}}),e._v(" "),s("el-input",{attrs:{placeholder:"请输入类型"},model:{value:e.create_type,callback:function(t){e.create_type=t},expression:"create_type"}}),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.new_button_save}},[e._v("保存")])],1),e._v(" "),s("quill-editor",{ref:"myQuillEditor",model:{value:e.new_content,callback:function(t){e.new_content=t},expression:"new_content"}})]],2)],1):e._e(),e._v(" "),e._l(e.datalist,function(t,a){return s("div",{key:a},[s("el-card",[t.edit?s("p",[s("quill-editor",{ref:"myQuillEditor",refInFor:!0,model:{value:t.content,callback:function(s){e.$set(t,"content",s)},expression:"item.content"}})],1):e._e(),e._v(" "),s("div",{staticClass:"card_bottom"},[t.edit?e._e():s("span",[e._v(e._s(t.typeString)+"-----")]),e._v(" "),t.edit?e._e():s("span",[e._v(e._s(t.title)+"    ")]),e._v(" "),t.edit?e._e():s("span",[e._v("【阅读量:"+e._s(t.readTimes)+"  ")]),e._v(" "),t.edit?e._e():s("span",[e._v("时间:"+e._s(t.timeString)+"】")]),e._v(" "),s("span",{staticClass:"card_bottom_item",on:{click:function(t){return e.click_edit(a)}}},[e._v("编辑")]),e._v(" "),t.edit?s("span",{staticClass:"card_bottom_item",on:{click:function(s){return e.save_edit_button(a,t)}}},[e._v("保存")]):e._e(),e._v(" "),t.edit?s("span",{staticClass:"card_bottom_item",on:{click:function(s){return e.save_edit_button_close(a,t)}}},[e._v("保存且关闭编辑")]):e._e(),e._v(" "),s("span",{staticClass:"card_bottom_item",on:{click:function(s){return e.delete_item(a,t)}}},[e._v("删除")])])])],1)}),e._v(" "),s("div",[e.pageInfo&&e.pageInfo.hasPreviousPage?s("span",{on:{click:function(t){return e.changePage(1)}}},[e._v("首页")]):e._e(),e._v(" "),e.pageInfo&&e.pageInfo.hasPreviousPage?s("span",{on:{click:function(t){return e.changePage(e.pageInfo.prePage)}}},[e._v("上一页")]):e._e(),e._v(" "),e.pageInfo?s("span",[e._v("当前页:"+e._s(e.pageInfo.pageNum))]):e._e(),e._v(" "),e.pageInfo&&e.pageInfo.hasNextPage?s("span",{on:{click:function(t){return e.changePage(e.pageInfo.nextPage)}}},[e._v("下一页")]):e._e(),e._v(" "),e.pageInfo&&e.pageInfo.hasNextPage?s("span",{on:{click:function(t){return e.changePage(e.pageInfo.pages)}}},[e._v("尾页")]):e._e()])],2)]),e._v(" "),s("wFooter")],1)},staticRenderFns:[]};var r=s("VU/8")(o,i,!1,function(e){s("lRUU")},null,null);t.default=r.exports},lRUU:function(e,t){}});
//# sourceMappingURL=4.4f887a43749e1502600e.1571037191297.js.map