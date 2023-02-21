import styles from './GameRules.module.css';

interface GameRulesProps {
  rulesChangeHandler: () => void;
}
export const GameRules = ({ rulesChangeHandler }: GameRulesProps) => {
  return (
    <div className={styles.container} role="presentation">
      <h1 className={styles.title}>Blazing 8s Rules</h1>
      <h2>Object of the Game</h2>
      <p>The object of the game is to be the first player to get rid of all of their cards.</p>
      <h2>Cards</h2>
      <p>A standard deck of 52 playing cards is used. Aces are high and twos are low.</p>
      <h2>Game Setup</h2>
      <ol>
        <li>Shuffle the deck and deal five cards to each player.</li>
        <li>
          Place the remaining cards in a draw pile in the center of the table, with the top card
          turned over and placed next to it to start the discard pile.
        </li>
      </ol>
      <h2>Game Play</h2>
      <ol>
        <li>The player to the left of the dealer goes first and play proceeds clockwise.</li>
        <li>
          The player must play a card that matches the suit or rank of the card on top of the
          discard pile.
        </li>
        <li>
          If a player cannot play a card, they must draw a card from the draw pile. If the drawn
          card can be played, the player may do so immediately. If not, the player adds the card to
          their hand and their turn ends.
        </li>
        <li>
          If an eight is played, the player who played the eight chooses the suit of the next card
          to be played. The eight can be played at any time, and the player can choose any suit.
        </li>
        <li>
          If a player plays a two, the next player must draw two cards from the draw pile and skip
          their turn.
        </li>
        <li>If a player plays a jack, the next player`s turn is skipped.</li>
        <li>
          If a player plays a queen, the player following them must play a card of the same suit, or
          draw until they have a card that can be played.
        </li>
        <li>If a player plays a king, the player can choose any player to take another turn.</li>
      </ol>
      <h2>Winning</h2>
      <p>
        The game ends when a player has no cards left in their hand. That player is declared the
        winner.
      </p>
      <h2
        className={styles.return}
        role="presentation"
        onClick={(e) => {
          e.stopPropagation();
          rulesChangeHandler();
        }}
      >
        Return tu Menu
      </h2>
    </div>
  );
};
