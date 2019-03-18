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

//TestWindow
	var TestWindow = null;

//Create the windows manager
	var WindowsManager = WindowsManagerClass();

window.onload = function()
{
	//Resize Elements in Page
		//OnResize();
		
	//Set jQuery to OnReize on a Resize
		jQ( window ).resize( OnResize );

	//Test create window
		var TestText = "Potato";
		TestWindow = new Window( "testwindow", 500, 500, 300, 300, true, "TestWindow", TestText, true, true, true );
		//TestWindow.RemoveSelf();
}

function WindowsManagerClass()
{
	  /////////////////
	 //Properties/////
	/////////////////

	//Contains the list of current exsisting windows
		var ListOfActiveWindows = null;

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

		}

	//Remove Window base on its name
		this.RemoveWindow = function( Name )
		{

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
	MaxSizeX, MaxSizeY  //Max size can scale to
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
			//var CloseCode = "";
			//if( this.Closable )
			//{ 
			//    CloseCode = "<div class = \"crossbutton\" id = \"" + this.Name + "clossbutton\" onclick=\"this.RemoveSelf()\"></div>";
			//}

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
			//CloseCode +
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
			var WindowBody = "#" + this.Name + "style";
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
}