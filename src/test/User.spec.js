import { expect } from 'chai';
import User from '../models/User.js';

describe('Teste User Class', () => {
  
  
  it('Deve criar um usuário', () => {
    const user = new User(1, 'rocha.amaury', 'Amaury Rocha', 'rocha.amaury@gmail.com', 'teste_avatar.png', 'teste123', 10, ['badge1']);
    expect(user.userId).to.equal(1);
    expect(user.username).to.equal('rocha.amaury');
    expect(user.name).to.equal('Amaury Rocha');
    expect(user.email).to.equal('rocha.amaury@gmail.com');
    expect(user.avatar).to.equal('teste_avatar.png');
    expect(user.password).to.equal('teste123');
    expect(user.points).to.equal(10);
    expect(user.badges).to.deep.equal(['badge1']);
  });


  it('Deve atualizar os pontos corretamente para diferentes ações', () => {
    const user = new User(1, 'rocha.amaury', 'Amaury Rocha', 'rocha.amaury@gmail.com', 'teste_avatar.png', 'teste123');
    user.updatePoints('topic_posted');
    expect(user.points).to.equal(3);
    user.updatePoints('comment_posted');
    expect(user.points).to.equal(5);
    user.updatePoints('like_given');
    expect(user.points).to.equal(6);
    user.updatePoints('unknown_action');
    expect(user.points).to.equal(6);
  });


});
