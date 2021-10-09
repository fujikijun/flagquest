//------------------------------------------------------------------------------------------ //<>// //<>// //<>// //<>// //<>//
//
//          Message
//
//------------------------------------------------------------------------------------------

class Message
{
  constructor()
  {
    this.vecImage = [];
    this.currentPos = 0;
    this.message_speed = MESSAGE_SPEED;
    this.loop = false;
    this.number = 0;
  }

  //----------------------------------------------------------------------------------------
  // setup
  //----------------------------------------------------------------------------------------

  setup( index, num )
  {
    this.vecImage = [];
    this.currentPos = 0;
    this.message_speed = MESSAGE_SPEED;
    this.loop = false;
    this.number = 0;
    
    this.number = num;
    for( let j=0; j<num; j++ )
    {
      let img = loadImage( "data/message"+index+"_"+j+".png" );
      if ( img == null )
      {
        break;
      }
      this.vecImage[j] = img;
    }
  }

  //----------------------------------------------------------------------------------------
  // reset
  //----------------------------------------------------------------------------------------

  reset()
  {
    this.currentPos = 0;
  }

  //----------------------------------------------------------------------------------------
  // draw
  //----------------------------------------------------------------------------------------

  draw()
  {        
    if ( this.loop )
    {
      this.currentPos+=this.message_speed;
      if ( this.currentPos > float(this.number) )
      {
        this.currentPos = float(vecImage.size()) - 1;
      }
       image( this.vecImage[int(this.currentPos)], 0, 0);

      this.currentPos+=this.message_speed;

      if ( this.currentPos > float(this.number) )
      {
        this.currentPos = 0;
      }

      return true;
    } else
    {
      if ( this.currentPos >= float(this.number) )
      {
        this.currentPos = float(this.number) - 1;
      }
      image( this.vecImage[int(this.currentPos)], 0, 0);

      this.currentPos+=this.message_speed;

      if ( this.currentPos > float(this.number) - 1 )
      {
        return true;
      }

      return false;
    }
  }
}