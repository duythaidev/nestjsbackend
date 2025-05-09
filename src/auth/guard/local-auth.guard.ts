import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() // Dùng đc ở class khác
export class LocalAuthGuard extends AuthGuard('local') {}
