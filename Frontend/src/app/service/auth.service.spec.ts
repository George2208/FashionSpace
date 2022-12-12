import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
    // const testUtils = new TestUtils();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService
        ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    service.removeUserFromLocalCache = jasmine.createSpy();
    service.logout();
    expect(service.removeUserFromLocalCache).toHaveBeenCalled();

  });
});
