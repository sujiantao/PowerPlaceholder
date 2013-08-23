PowerPlaceholder
================

<section id="overview">
          <div class="page-header">
            <h1>什么是 PowerPlaceholder</h1>
          </div>
          <p>PowerPlaceholder是一款基于jQuery的Placeholder插件，可用于input输入框及textarea输入框，在其内部实现提示文字效果。</P>
		      <p>向Stackoverflow致敬，本js大量参考了Stackoverflow中相关实现。</P>
		      <P>大家可以随意修改使用。</P>

          <h3>应用场景</h3>
          <ul>
            <li>界面输入内容多，没有额外空间为用户显示提示文字</li>
            <li>对用户体验要求较高，提供流畅的输入体验</li>
          </ul>
		  <h3>依赖</h3>
		  <p>只依赖于jQuery 1.6+</P>
<h3>特点</h3>
         <ul>
            <li>纯JavaScript脚本</li>
            <li>支持目前所有主流浏览器:IE6+,Firefox,Chorome等等</li>
            <li>支持输入框获得焦点和失去焦点时提示文字变浅和恢复，对用户更友好</li>
            <li>使用简单，只需要在需要显示提示内容的控件后增加一个span元素,class设置为'jq-overlay-text'</li>
          </ul>
        </section>
        
        
        <section id="modals">
          <div class="page-header">
            <h1>示例</h1>
          </div>
		  <div>
			 <h4>Input输入框效果</h4>
			 <p>效果</p>
			 <input type="text" id="input1" />
		     <span class="jq-overlay-text" style="display: none" >输入邮箱/手机号/用户名</span>

			 <p>代码</p>
			 
			 <pre class="prettyprint linenums">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
  &lt;/head&gt;
  &lt;body&gt;
     &lt;input type="text" id="input1" /&gt;
		     &lt;span class="jq-overlay-text" style="display: none" &gt;输入邮箱/手机号/用户名&lt;/span&gt;
    &lt;script src="js/jquery.js"&gt;&lt;/script&gt;
    &lt;script src="js/bootstrap.min.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript"&gt;
		 $("#input1").powerPlaceholder();
	&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>
		  </div>
		  <div>
			 <h4>Textarea输入框</h4>
			 <p>效果</p>
			 <textarea id="input2"></textarea>
		     <span class="jq-overlay-text" style="display: none" >请输入详细描述...</span>
			 <p>代码</p>
			  <pre class="prettyprint linenums">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
  &lt;/head&gt;
  &lt;body&gt;
     &lt;textarea type="text" id="input2"  /&gt;
		     &lt;span class="jq-overlay-text" style="display: none" &gt;请输入详细描述...&lt;/span&gt;
    &lt;script src="js/jquery.js"&gt;&lt;/script&gt;
    &lt;script src="js/bootstrap.min.js"&gt;&lt;/script&gt;
	&lt;script type="text/javascript"&gt;
		 $("#input2").powerPlaceholder();
	&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>
		  </div>

      <div>
       <h4>自定义单个输入框的透明度及包含遮罩文字的样式</h4>
       <p>效果(初始化不透明度为0.7，获得焦点时增加0.5，0.7+0.5>1,所以获得焦点时提示文字将完全不可见)</p>
       <input type="text" id="input3"></input>
         <span class="jq-custom-overlaytext" style="display: none" >自定义样式</span>
       <p>代码</p>
        <pre class="prettyprint linenums">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
  &lt;/head&gt;
  &lt;body&gt;
     &lt;textarea type="text" id="input3"  /&gt;
         &lt;span class="jq-custom-overlaytext" style="display: none" &gt;自定义样式&lt;/span&gt;
    &lt;script src="js/jquery.js"&gt;&lt;/script&gt;
    &lt;script src="js/bootstrap.min.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript"&gt;
     $("#input3").powerPlaceholder({initOpacity:0.7,focusOpacityDiff:0.5,overlayTextClass:'jq-custom-overlaytext'});
  &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>
      </div>

<div>
       <h4>全局自定义页面中所有输入框的透明度及包含遮罩文字的样式</h4>
       
        <pre class="prettyprint linenums">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;script src="js/jquery.js"&gt;&lt;/script&gt;
    &lt;script src="js/bootstrap.min.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript"&gt;
    $.fn.powerPlaceholder.defaults.initOpacity=0.7;
    $.fn.powerPlaceholder.defaults.focusOpacityDiff=0.5;
    $.fn.powerPlaceholder.defaults.overlayTextClass='jq-custom-overlaytext';
    // 全局设置一定要在初始化前
    $('selector').powerPlaceholder();

  &lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>
      </div>

        </section>
