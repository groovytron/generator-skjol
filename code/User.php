<?

class User
{
  private $username;

  public function setUsername(string $username)
  {
    $this->username = $username;
  }

  public function getUsername(): string
  {
    return $this->username;
  }
}
