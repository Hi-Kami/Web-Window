//Id to the window tag
	const WindowDivHandleName = "windowcontainer";

//Default Min size it can scale down to
	const CMinSizeX = 132;
	const CMinSizeY = 42;

//Default Max size it can scale up to
	const CMaxSizeX = 800;
	const CMaxSizeY = 600;

//Resize function
	var OnResize;

//Create the windows manager
	var WindowsManager = new WindowsManagerClass();

window.onload = function()
{
	//Resize Elements in Page
		//OnResize();
		
	//Set jQuery to OnReize on a Resize
		jQ( window ).resize( OnResize );

	//Test create window
		var TestText = "Potato";
		WindowsManager.CreateNewWindow( "testwindow", 500, 500, 300, 300, true, "TestWindow", TestText, true, true, true );
		//TestWindow.RemoveWindow("testwindow");
}

function WindowsManagerClass()
{
	  /////////////////
	 //Properties/////
	/////////////////

	//Contains the list of current exsisting windows
		var ListOfActiveWindows = new Array();

	   ////////////////
	  //Methods///////
	 ////////////////

	 //Create new window
		this.CreateNewWindow = function
		(
			Name, //Window name
			X = 200, Y = 200, //Size of the window
			PosX = 0, PosY = 0, //Spawn Position
			Moveable = true, //Weather it is movable or not
			Title = "NewWindow", //Top bar title
			HTMLData = "", //HTML it will contain
			Minimizable = true, Closable = true, Sizeable = false, //behavor ablities
			MinSizeX = CMinSizeX, MinSizeY = CMinSizeY, //Min size can scale to
			MaxSizeX = CMaxSizeX, MaxSizeY = CMaxSizeY  //Max size can scale to
		)
		{
			//Adds name to list so can access via jQuery and generates window
			ListOfActiveWindows.push( Name );
			Window( Name, X, Y, PosX, PosY, Moveable, Title, HTMLData, Minimizable, Closable, Sizeable, MinSizeX, MinSizeY, MaxSizeX, MaxSizeY );
		}

	//Remove Window base on its name
		this.RemoveWindow = function( Name )
		{
			for( var i = 0; i < ListOfActiveWindows.length; i++ )
			{
				if( Name == ListOfActiveWindows[i] )//If found a matching name in list turn off handles and remove html container 
				{
					//Remove Event handles in jQ
						var WindowBody = "#" + this.Name + "style";
						var WindowHeader = "#" + this.Name + "header";

					//Sizeable
						jQ
						(
							function()
							{
								jQ( WindowBody ).resizable( "destroy" );
							}
						);

					//Moveable
						jQ
						( 
							function()
							{
								jQ( WindowBody ).draggable( "destroy" );
							}
						);

					//Remove Item from html and list and break out of loop
						jQ( "#" + Name + "style" ).remove();
						ListOfActiveWindows.splice( i, 1 );
						break;
				}
			}
		}
}


function Window
(
	Name, //Window name
	X, Y, //Size of the window
	PosX, PosY, //Spawn Position
	Moveable, //Weather it is movable or not
	Title, //Top bar title
	HTMLData, //HTML it will contain
	Minimizable, Closable, Sizeable, //behavor ablities
	MinSizeX, MinSizeY, //Min size can scale to
	MaxSizeX, MaxSizeY //Max size can scale to
)
{
	//Name, for tag Id
		this.Name = Name;

	//Position On screen
        this.PosX = PosX;
		this.PosY = PosY;
		
	//Size On Screen
		this.SizeX = X;
		this.SizeY = Y;

	//Min and Max Size of Window
		this.MinSizeX = MinSizeX;
		this.MinSizeY = MinSizeY;
		this.MaxSizeX = MaxSizeX;
		this.MaxSizeY = MaxSizeY;

	//Ability States
		this.Minimizable = Minimizable;//ToDo: add, make so it shrinks to title only
		this.Closable = Closable;//ToDo: Make so it removes html and destroys self
		this.Sizeable = Sizeable;
	
	//States
		this.Moveable = Moveable;


	//Add window html code
	{
		//X button
			var CloseCode = "";
			if( this.Closable )
			{ 
			    CloseCode = "<div class = \"crossbutton\" id = \"" + this.Name + "clossbutton\" onclick=\"WindowsManager.RemoveWindow(\'" + this.Name + "\');\"></div>";
			}

		//_ Button
			//var MinCode = "";
			//if( this.Minimizable )
			//{
			//    MinCode = "<div class = \"minbutton\" id = \"" + this.Name + "minbutton\"></div>";
			//}

		var TmpText =
			"<div  class = \"windowstyle ui-widget-content\" id = \"" + // /
			this.Name + "style" + //Name of window                      // |
			"\" style =\"" +                                            // |
			"left: " + this.PosX + "px; " + //X                         // | Main window div
			"top: " + this.PosY + "px; " + //Y                          // |
			"width: " + this.SizeX + "px; " + //SizeX                   // |
			"height: " + this.SizeY + "px;" + //SizeY                   // \
			"\">" +
			
			"<div class = \"windowheaderstyle ui-widget-content\" id = \"" + // /
			this.Name + "header" + //Name of window                          // |
			"\">" +                                                          // | Header area div
			Title + //Display a title in the title bar                       // |

			//Buttons, if constructed                
			CloseCode +
			//MinCode +

			"</div>" +                                                       // \

			

			"<div class = \"windowbodystyle ui-widget-content\" id = \"" +    // /
			this.Name + "body" + //Name of window                             // |
			"\">" +                                                           // | Body area div
			HTMLData + //Html content,                                        // |
			"</div>" +                                                        // \

			"</div>"; //end main div

			jQ( ".windowcontainer" ).append( TmpText );
	}



	//if Moveable
	if( this.Moveable )
	{
		//CreateName
			var WindowBody = "#" + this.Name + "style";
		
		//Set Event
			jQ
			( 
				function()
				{
					jQ( WindowBody ).draggable
					( 
						{
							containment: "window",
							scroll: false, 
							handle: WindowHeader 
						} 
					);
				}
			);
	}

	//if Sizeable
	if( this.Sizeable  )
	{
		//Create Name
			var WindowBody = "#" + this.Name + "style";
			var WindowHeader = "#" + this.Name + "header";

		//Create temp object to build object to pass in
			var tmpobj = 
			{
				maxHeight: this.MaxSizeY,
				maxWidth: this.MaxSizeX,
				minHeight: this.MinSizeY,
				minWidth: this.MinSizeX
			}

		//Set Event
			jQ
			(
				function()
				{
					jQ( WindowBody ).resizable( tmpobj );
				}
			);
	}
		

//ToDo: Min function
//ToDo: Max function
//ToDo: Populate function
//ToDo: Maybe, make a manager class to manage focus, will have to rengister all windows for this and hanlde creatiion in the manager
//ToDo: Add paramaters for functions to handle on close and on resize, etc
}