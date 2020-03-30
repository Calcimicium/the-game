create table game (
	id serial constraint pk_game primary key,
	max_players smallint,
	pass varchar(16),
	creator integer not null constraint fk_game_creator references player (id) on delete cascade
)
