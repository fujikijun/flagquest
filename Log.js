//------------------------------------------------------------------------------------------
//
//          Log
//
//------------------------------------------------------------------------------------------

class Data
{
  constructor()
  {
    this.m_iTime = 0;
    this.m_iEventIndex = 0;
    this.m_iPlayerX = 0;
    this.m_iPlayerY = 0;
    this.m_iUseMaskTime = 0;
    this.m_iMaskDirection = 0;
    this.m_iMaskUpside = 0;
    this.m_iGetFlagNum = 0;
    this.m_iUseMaskCount = 0;
    this.m_iWarpCount = 0;
  }
}

class Log
{      
  //----------------------------------------------------------------------------------------
  // Log
  //----------------------------------------------------------------------------------------

  constructor()
  {
    this.m_strFileName = "/log/";
    this.m_iStartTime = 0;
    this.m_iTotalPlayCount = 0; // Global
    this.m_iPlayTime = 0;
    this.m_iGetFlagNum = 0;
    this.m_iUseMaskCount = 0;
    this.m_iWarpCount = 0;
    this.m_iUseMaskTime = 0;

    this.strLogHeader = "";
    this.strLogTotal = "";
    this.strLogBody = "";

    this.newfile = false;
  }

  //----------------------------------------------------------------------------------------
  // Restart
  //----------------------------------------------------------------------------------------

  Restart()
  {
  }

  //----------------------------------------------------------------------------------------
  // Write
  //----------------------------------------------------------------------------------------

  WriteEvent( iEventIndex )
  {
  }

  WriteFish()
  {

  }

  output()
  {
  }
}